import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"; // Añadido MaterialCommunityIcons

import InicioStack from "./Stacks/InicioStack";
import PerfilesStack from "./Stacks/PerfilStack";
import ConfiguracionesStack from "./Stacks/ConfiguracionStack";
// import CitasStack from "./Stacks/CitaStack";
// import ConsultoriosStack from "./Stacks/ConsultorioStack";
// import EpsStack from "./Stacks/EpsStack";
// import EspecialidadesStack from "./Stacks/EspecialidadStack";
// import MedicosStack from "./Stacks/MedicoStack";
// import PacientesStack from "./Stacks/PacienteStack";
// import SedesStack from "./Stacks/SedeStack";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
<Tab.Navigator
    screenOptions={{
        tabBarStyle: {
            backgroundColor: '#101522', // Fondo oscuro
            borderTopWidth: 1,
            borderTopColor: '#00f0ff55', // Borde superior con acento cian translúcido
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
        },
        tabBarActiveTintColor: "#00f0ff", // Cian brillante para activa
        tabBarInactiveTintColor: "#5edfff", // Cian claro para inactiva
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            marginTop: 2,
            textShadowColor: '#00f0ff99',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 6,
        },
    }}
>
    <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
            ),
            tabBarLabel: 'Inicio',
        }}
    />

    <Tab.Screen
        name="Perfil"
        component={PerfilesStack}
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Feather name="users" size={size} color={color} />
            ),
            tabBarLabel: 'Perfil',
        }}
    />

    <Tab.Screen
        name="Configuración"
        component={ConfiguracionesStack}
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Configuración',
        }}
    />
</Tab.Navigator>
    );
}