'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + React
// This is a known issue where leaflet can't find the marker icons
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationData {
    city: string;
    state: string;
    country: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

interface LocationPickerProps {
    onLocationSelect: (location: LocationData) => void;
    initialLocation?: LocationData | null;
}

// Component to handle map view updates
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

// Map Click Handler component
function MapEvents({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedCoords, setSelectedCoords] = useState<[number, number]>(
        initialLocation?.coordinates 
            ? [initialLocation.coordinates.latitude, initialLocation.coordinates.longitude] 
            : [20.5937, 78.9629] // Default to center of India or a neutral location
    );
    const [loading, setLoading] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    // Search for cities using Nominatim
    const searchCities = async (query: string) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            // we filter for cities/towns/villages (place types)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            searchCities(query);
        }, 500);
    };

    const handleSelectSuggestion = (place: any) => {
        const { lat, lon, address } = place;
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        setSelectedCoords([latitude, longitude]);
        setSuggestions([]);
        setSearchQuery(`${address.city || address.town || address.village || address.name}, ${address.country}`);

        onLocationSelect({
            city: address.city || address.town || address.village || address.suburb || address.name || '',
            state: address.state || '',
            country: address.country || '',
            coordinates: {
                latitude,
                longitude
            }
        });
    };

    const reverseGeocode = async (lat: number, lon: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
            );
            const data = await response.json();
            if (data.address) {
                const address = data.address;
                setSearchQuery(`${address.city || address.town || address.village || address.name || 'Selected Location'}, ${address.country || ''}`);
                
                onLocationSelect({
                    city: address.city || address.town || address.village || address.suburb || address.name || '',
                    state: address.state || '',
                    country: address.country || '',
                    coordinates: {
                        latitude: lat,
                        longitude: lon
                    }
                });
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMapClick = (lat: number, lon: number) => {
        setSelectedCoords([lat, lon]);
        reverseGeocode(lat, lon);
    };

    return (
        <div className="flex flex-col gap-4 w-full h-[400px]">
            {/* Search Bar */}
            <div className="relative z-[1001]">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for your city..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 shadow-sm"
                    />
                    {loading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[1002]">
                        {suggestions.map((place) => (
                            <button
                                key={place.place_id}
                                onClick={() => handleSelectSuggestion(place)}
                                className="w-full px-4 py-3 text-left hover:bg-purple-50 border-b border-gray-50 last:border-0 transition-colors flex flex-col"
                            >
                                <span className="font-bold text-gray-800 text-sm">
                                    {place.address.city || place.address.town || place.address.village || place.address.name}
                                </span>
                                <span className="text-xs text-gray-500 truncate">
                                    {place.display_name}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map Container */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-inner group relative z-[500]">
                <MapContainer
                    center={selectedCoords}
                    zoom={5}
                    className="w-full h-full"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ChangeView center={selectedCoords} />
                    <MapEvents onMapClick={handleMapClick} />
                    <Marker position={selectedCoords} />
                </MapContainer>
                
                {/* Visual indicator for click-to-pick */}
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-600 shadow-sm pointer-events-none z-[1000]">
                    📍 Tap map to set location
                </div>
            </div>
            
            <p className="text-[11px] text-gray-400 font-medium italic">
                * Location helps us find souls nearby. Your exact location is never shared.
            </p>
        </div>
    );
}
