import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Configuración() {
  // Estados para los switches
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Estados para las opciones seleccionables
  const [selectedFrequency, setSelectedFrequency] = useState("Diaria");
  const [selectedTheme, setSelectedTheme] = useState("Predeterminado");
  const [selectedTextSize, setSelectedTextSize] = useState("Mediano");

  return (
    <View style={styles.container}>
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgDots} />
      
      <Text style={styles.title}>Configuración</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Activar notificaciones</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FF8E9E" }}
            thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            value={notificationsEnabled}
          />
        </View>
        
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Sonido de notificaciones</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FF8E9E" }}
            thumbColor={soundEnabled ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={() => setSoundEnabled(!soundEnabled)}
            value={soundEnabled}
            disabled={!notificationsEnabled}
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.optionContainer, {borderBottomWidth: 0}]}
          onPress={() => {
            // Aquí podrías mostrar un modal o accionesheet para seleccionar frecuencia
            const frequencies = ["Diaria", "Semanal", "Mensual"];
            const currentIndex = frequencies.indexOf(selectedFrequency);
            const nextIndex = (currentIndex + 1) % frequencies.length;
            setSelectedFrequency(frequencies[nextIndex]);
          }}
        >
          <Text style={styles.optionText}>Frecuencia: {selectedFrequency}</Text>
          <Text style={styles.optionArrow}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Modo oscuro</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#8EC5E6" }}
            thumbColor={darkModeEnabled ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={() => setDarkModeEnabled(!darkModeEnabled)}
            value={darkModeEnabled}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => {
            // Cambiar tema de colores
            const themes = ["Predeterminado", "Rosa", "Azul", "Verde"];
            const currentIndex = themes.indexOf(selectedTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            setSelectedTheme(themes[nextIndex]);
          }}
        >
          <Text style={styles.optionText}>Tamaño de  la letra: {selectedTheme}</Text>
          <Text style={styles.optionArrow}>▶</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.optionContainer, {borderBottomWidth: 0}]}
          onPress={() => {
            // Cambiar tamaño de texto
            const sizes = ["Pequeño", "Mediano", "Grande"];
            const currentIndex = sizes.indexOf(selectedTextSize);
            const nextIndex = (currentIndex + 1) % sizes.length;
            setSelectedTextSize(sizes[nextIndex]);
          }}
        >
          <Text style={styles.optionText}>Tamaño: {selectedTextSize}</Text>
          <Text style={styles.optionArrow}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f9ff',
        padding: 25,
        position: 'relative',
        overflow: 'hidden',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FF8E9E',
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(255, 142, 158, 0.3)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
    section: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 25,
        shadowColor: "#B5EAD7",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#8EC5E6',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#F5D3E7',
        paddingBottom: 8,
        paddingTop: 15,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(200, 200, 200, 0.2)',
    },
    optionText: {
        fontSize: 17,
        color: '#7A7A7A',
    },
    optionArrow: {
        fontSize: 14,
        color: '#CCCCCC',
    },
    bgCircle1: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(182, 216, 242, 0.4)',
        top: -50,
        right: -80,
        zIndex: -1,
    },
    bgCircle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 209, 220, 0.4)',
        bottom: -50,
        left: -50,
        zIndex: -1,
    },
    bgDots: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -2,
        backgroundColor: 'transparent',
        opacity: 0.1,
    },
});