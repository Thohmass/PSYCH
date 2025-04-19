import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Psychologist } from "@myproject/shared";

interface MapProps {
    psychologists: Psychologist[];
}

const containerStyle = {
    width: '100%',
    height: '400px',
};

// Predvolené stredové súradnice pre mapu (Bratislava)
const center = {
    lat: 48.1486,
    lng: 17.1077,
};

const Map: React.FC<MapProps> = ({ psychologists }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_Maps_API_KEY ?? "",
    });

    if (!isLoaded) {
        return <div>Načítavam mapu...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
        >
            {psychologists.map((psychologist) => (
                psychologist.Locations && psychologist.Locations.map((location, index) => {
                    // Predpokladáme, že tvoja vlastnosť Locations obsahuje pole adries.
                    // V reálnom svete by si tu pravdepodobne potreboval geokódovanie
                    // na premenu adresy na zemepisné súradnice (latitude a longitude).
                    // Pre jednoduchosť teraz použijeme statické súradnice alebo
                    // predpokladáme, že máš v dátach už latitude a longitude.

                    // **Dôležité:** Toto je len zjednodušený príklad. V reálnej aplikácii
                    // budeš musieť získať skutočné súradnice pre každú lokalitu.

                    // Ak máš v Psychologist objekte latitude a longitude:
                    // return (
                    //   <Marker
                    //     key={psychologist.id}
                    //     position={{ lat: psychologist.latitude, lng: psychologist.longitude }}
                    //     title={`${psychologist.Name} ${psychologist.LastName}`}
                    //   />
                    // );

                    // Ak máš len adresy, budeš potrebovať geokódovanie:
                    // (Toto je len náznak, reálna implementácia by bola zložitejšia)
                    // const coordinates = geocodeAddress(location);
                    // if (coordinates) {
                    return (
                        <Marker
                            key={`${psychologist.id}-${index}`}
                            position={{ lat: center.lat + index * 0.01, lng: center.lng + index * 0.01 }}
                            title={`${psychologist.Name} ${psychologist.LastName} - ${location}`}
                        />
                    );
                    // }
                    // return null;
                })
            ))}
        </GoogleMap>
    );
};

export default Map;