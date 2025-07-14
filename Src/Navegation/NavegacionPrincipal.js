import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";
import MenuInicial from "./stacks/MenuInicial";
import PerfilStack from "./stacks/PerfilStack";
import ConfiguracionStack from "./stacks/ConfiguracionStack";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#101522',
                    borderTopWidth: 1,
                    borderTopColor: '#00f0ff55',
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: "#00f0ff",
                tabBarInactiveTintColor: "#5edfff",
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
                component={MenuInicial}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                    tabBarLabel: 'Inicio',
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={PerfilStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={size} color={color} />
                    ),
                    tabBarLabel: 'Perfil',
                }}
            />

            <Tab.Screen
                name="Configuración"
                component={ConfiguracionStack}
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