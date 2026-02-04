import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  // Estados para los controles
  const [pointerSpeed, setPointerSpeed] = useState(6);
  const [touchSensitivity, setTouchSensitivity] = useState(75);
  const [acceleration, setAcceleration] = useState(2);
  const [dpi, setDpi] = useState(3200);
  const [scrollSpeed, setScrollSpeed] = useState(3);
  const [pollingRate, setPollingRate] = useState(1000);
  
  // Estados de la UI
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [barHeights, setBarHeights] = useState([60, 85, 45, 70, 90, 65, 80]);
  
  // Valores de aceleración
  const accelerationLabels = ['Desactivada', 'Baja', 'Media', 'Alta', 'Máxima'];
  
  // Aplicar preset
  const applyPreset = (preset) => {
    switch(preset) {
      case 'fps':
        setPointerSpeed(4);
        setTouchSensitivity(40);
        setDpi(800);
        setPollingRate(1000);
        setAcceleration(0);
        break;
      case 'moba':
        setPointerSpeed(8);
        setTouchSensitivity(65);
        setDpi(2400);
        setPollingRate(500);
        setAcceleration(2);
        break;
      case 'rts':
        setPointerSpeed(15);
        setTouchSensitivity(90);
        setDpi(4800);
        setPollingRate(1000);
        setAcceleration(4);
        break;
    }
    showNotification(`Preset ${preset.toUpperCase()} aplicado`);
  };
  
  // Aplicar configuración
  const applySettings = () => {
    setModalVisible(true);
    showNotification('Configuración aplicada exitosamente');
  };
  
  // Mostrar notificación
  const showNotification = (text) => {
    setNotificationText(text);
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };
  
  // Simular visualización del sensor
  useEffect(() => {
    const interval = setInterval(() => {
      const dpiFactor = dpi / 16000;
      const pollingFactor = pollingRate / 8000;
      const newHeights = barHeights.map(() => {
        const baseHeight = 30 + Math.random() * 60;
        const adjustedHeight = baseHeight * (0.7 + 0.3 * (dpiFactor + pollingFactor) / 2);
        return Math.min(100, adjustedHeight);
      });
      setBarHeights(newHeights);
    }, 500);
    
    return () => clearInterval(interval);
  }, [dpi, pollingRate]);
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121226', '#0a0a1a']}
        style={styles.background}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <FontAwesome5 name="dragon" size={32} color="#ff2a00" />
              <Text style={styles.logoText}>REDRAGON</Text>
            </View>
            
            <View style={styles.statusBar}>
              <View style={styles.statusItem}>
                <View style={styles.statusIndicator} />
                <Text style={styles.statusText}>Mouse Conectado</Text>
              </View>
              <View style={styles.statusItem}>
                <MaterialIcons name="memory" size={16} color="#00e5ff" />
                <Text style={styles.statusText}>DPI: {dpi}</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="speedometer" size={16} color="#00e5ff" />
                <Text style={styles.statusText}>Polling: {pollingRate}Hz</Text>
              </View>
            </View>
          </View>
          
          {/* Contenido Principal */}
          <View style={styles.mainContent}>
            {/* Panel de Control 1 */}
            <View style={styles.controlPanel}>
              <View style={styles.panelHeader}>
                <Ionicons name="speedometer" size={24} color="#00e5ff" />
                <Text style={styles.panelTitle}>Velocidad y Sensibilidad</Text>
              </View>
              
              {/* Control de Velocidad */}
              <View style={styles.controlGroup}>
                <View style={styles.controlLabel}>
                  <Text style={styles.controlName}>Velocidad del Puntero</Text>
                  <Text style={styles.controlValue}>{Math.round(pointerSpeed)}</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={20}
                  value={pointerSpeed}
                  onValueChange={setPointerSpeed}
                  minimumTrackTintColor="#ff2a00"
                  maximumTrackTintColor="#1a1a33"
                  thumbTintColor="#00e5ff"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>Lento</Text>
                  <Text style={styles.sliderLabel}>Rápido</Text>
                </View>
              </View>
              
              {/* Control de Sensibilidad Touch */}
              <View style={styles.controlGroup}>
                <View style={styles.controlLabel}>
                  <Text style={styles.controlName}>Sensibilidad del Touch</Text>
                  <Text style={styles.controlValue}>{Math.round(touchSensitivity)}%</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={100}
                  value={touchSensitivity}
                  onValueChange={setTouchSensitivity}
                  minimumTrackTintColor="#ff2a00"
                  maximumTrackTintColor="#1a1a33"
                  thumbTintColor="#00e5ff"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>Baja</Text>
                  <Text style={styles.sliderLabel}>Alta</Text>
                </View>
              </View>
              
              {/* Control de Aceleración */}
              <View style={styles.controlGroup}>
                <View style={styles.controlLabel}>
                  <Text style={styles.controlName}>Aceleración del Mouse</Text>
                  <Text style={styles.controlValue}>{accelerationLabels[acceleration]}</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={4}
                  step={1}
                  value={acceleration}
                  onValueChange={setAcceleration}
                  minimumTrackTintColor="#ff2a00"
                  maximumTrackTintColor="#1a1a33"
                  thumbTintColor="#00e5ff"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>Desactivada</Text>
                  <Text style={styles.sliderLabel}>Máxima</Text>
                </View>
              </View>
              
              {/* Presets */}
              <View style={styles.presetsContainer}>
                <TouchableOpacity 
                  style={styles.presetButton}
                  onPress={() => applyPreset('fps')}
                >
                  <Text style={styles.presetText}>FPS (Baja Sensibilidad)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.presetButton}
                  onPress={() => applyPreset('moba')}
                >
                  <Text style={styles.presetText}>MOBA (Media Sensibilidad)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.presetButton}
                  onPress={() => applyPreset('rts')}
                >
                  <Text style={styles.presetText}>RTS (Alta Sensibilidad)</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Panel de Control 2 */}
            <View style={styles.controlPanel}>
              <View style={styles.panelHeader}>
                <MaterialIcons name="crosshairs" size={24} color="#00e5ff" />
                <Text style={styles.panelTitle}>DPI y Tasa de Refresco</Text>
              </View>
              
              {/* Control de DPI */}
              <View style={styles.controlGroup}>
                <View style={styles.controlLabel}>
                  <Text style={styles.controlName}>Niveles de DPI</Text>
                  <Text style={styles.controlValue}>{dpi}</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={800}
                  maximumValue={16000}
                  step={100}
                  value={dpi}
                  onValueChange={setDpi}
                  minimumTrackTintColor="#ff2a00"
                  maximumTrackTintColor="#1a1a33"
                  thumbTintColor="#00e5ff"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>800</Text>
                  <Text style={styles.sliderLabel}>16000</Text>
                </View>
              </View>
              
              {/* Control de Velocidad Scroll */}
              <View style={styles.controlGroup}>
                <View style={styles.controlLabel}>
                  <Text style={styles.controlName}>Velocidad del Scroll</Text>
                  <Text style={styles.controlValue}>{Math.round(scrollSpeed)}</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={10}
                  value={scrollSpeed}
                  onValueChange={setScrollSpeed}
                  minimumTrackTintColor="#ff2a00"
                  maximumTrackTintColor="#1a1a33"
                  thumbTintColor="#00e5ff"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>Lento</Text>
                  <Text style={styles.sliderLabel}>Rápido</Text>
                </View>
              </View>
              
              {/* Control de Polling Rate */}
              <View style={styles.controlGroup}>
                <View style={styles.controlLabel}>
                  <Text style={styles.controlName}>Tasa de Polling (Hz)</Text>
                  <Text style={styles.controlValue}>{pollingRate}Hz</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={125}
                  maximumValue={8000}
                  step={125}
                  value={pollingRate}
                  onValueChange={setPollingRate}
                  minimumTrackTintColor="#ff2a00"
                  maximumTrackTintColor="#1a1a33"
                  thumbTintColor="#00e5ff"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>125Hz</Text>
                  <Text style={styles.sliderLabel}>8000Hz</Text>
                </View>
              </View>
              
              {/* Botón Aplicar */}
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={applySettings}
              >
                <LinearGradient
                  colors={['#ff2a00', '#ff6a00']}
                  style={styles.gradientButton}
                >
                  <Ionicons name="flash" size={20} color="white" />
                  <Text style={styles.applyButtonText}>Aplicar Configuración</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            {/* Dashboard */}
            <View style={styles.dashboard}>
              {/* Panel de Estadísticas */}
              <View style={styles.statsPanel}>
                <Text style={styles.statsTitle}>Estadísticas en Tiempo Real</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{dpi}</Text>
                    <Text style={styles.statLabel}>DPI Actual</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{pollingRate}Hz</Text>
                    <Text style={styles.statLabel}>Tasa de Polling</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{Math.round(pointerSpeed)}</Text>
                    <Text style={styles.statLabel}>Velocidad Puntero</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{Math.round(touchSensitivity)}%</Text>
                    <Text style={styles.statLabel}>Sensibilidad Touch</Text>
                  </View>
                </View>
              </View>
              
              {/* Panel de Visualización */}
              <View style={styles.statsPanel}>
                <Text style={styles.statsTitle}>Rendimiento del Sensor</Text>
                <View style={styles.visualization}>
                  {barHeights.map((height, index) => (
                    <View 
                      key={index} 
                      style={[
                        styles.bar,
                        { height: `${height}%` }
                      ]} 
                    />
                  ))}
                </View>
                <View style={styles.visualizationInfo}>
                  <Ionicons name="information-circle" size={16} color="#a0a0c0" />
                  <Text style={styles.visualizationText}>
                    Simulación de respuesta del sensor con configuraciones actuales
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Redragon Optimizer v2.1 • Aplicación de optimización para dispositivos gamer • © 2023 Redragon
            </Text>
            <Text style={[styles.footerText, styles.footerSubtext]}>
              Esta es una aplicación de demostración. Para funcionalidad completa, instala el controlador oficial de Redragon.
            </Text>
          </View>
        </ScrollView>
        
        {/* Modal de Confirmación */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Configuración Aplicada</Text>
              <Text style={styles.modalText}>
                Se han aplicado todos los ajustes de configuración a tu dispositivo Redragon.
              </Text>
              <Text style={styles.modalText}>Los nuevos valores son:</Text>
              
              <View style={styles.modalList}>
                <Text style={styles.modalListItem}>• DPI: {dpi}</Text>
                <Text style={styles.modalListItem}>• Tasa de Polling: {pollingRate}Hz</Text>
                <Text style={styles.modalListItem}>• Velocidad de puntero: {pointerSpeed}</Text>
                <Text style={styles.modalListItem}>• Sensibilidad touch: {touchSensitivity}%</Text>
              </View>
              
              <Text style={styles.modalText}>
                Reinicia tu dispositivo para que los cambios surtan efecto completamente.
              </Text>
              
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* Notificación */}
        {notificationVisible && (
          <View style={styles.notification}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.notificationText}>{notificationText}</Text>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#f0f0f5',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a33',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4caf50',
    marginRight: 8,
  },
  statusText: {
    color: '#f0f0f5',
    fontSize: 14,
  },
  mainContent: {
    padding: 20,
  },
  controlPanel: {
    backgroundColor: '#1a1a33',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f0f0f5',
    marginLeft: 15,
  },
  controlGroup: {
    marginBottom: 20,
  },
  controlLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  controlName: {
    color: '#f0f0f5',
    fontSize: 16,
    fontWeight: '500',
  },
  controlValue: {
    color: '#00e5ff',
    fontSize: 16,
    fontWeight: '700',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderLabel: {
    color: '#a0a0c0',
    fontSize: 12,
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  presetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  presetText: {
    color: '#f0f0f5',
    fontSize: 14,
  },
  applyButton: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  dashboard: {
    marginTop: 10,
  },
  statsPanel: {
    backgroundColor: '#1a1a33',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    color: '#00e5ff',
    marginBottom: 20,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff2a00',
    width: '48%',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f0f0f5',
    marginBottom: 5,
  },
  statLabel: {
    color: '#a0a0c0',
    fontSize: 14,
  },
  visualization: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bar: {
    width: '12%',
    backgroundColor: '#ff2a00',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  visualizationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  visualizationText: {
    color: '#a0a0c0',
    fontSize: 12,
    marginLeft: 5,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    color: '#a0a0c0',
    fontSize: 12,
    textAlign: 'center',
  },
  footerSubtext: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a33',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: '#00e5ff',
    marginBottom: 15,
    fontWeight: '600',
  },
  modalText: {
    color: '#f0f0f5',
    marginBottom: 10,
    fontSize: 16,
  },
  modalList: {
    marginLeft: 20,
    marginVertical: 15,
  },
  modalListItem: {
    color: '#f0f0f5',
    fontSize: 16,
    marginBottom: 5,
  },
  modalCloseButton: {
    backgroundColor: '#ff2a00',
    padding: 12,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  notification: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff2a00',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});