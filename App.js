import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Linking, FlatList, Image, ScrollView, StatusBar } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor('#000000');
  
  const [screen, setScreen] = useState('home');
  const [name, setName] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [availableTimes, setAvailableTimes] = useState(['08:00', '09:00', '10:00', '11:00', '14:00', '16:00', '17:00']);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [users, setUsers] = useState([
    { username: 'admin', password: '123', role: 'admin' },
    { username: 'cliente', password: '123', role: 'cliente' },
    { username: 'adm', password: 'adm', role: 'admin' },
    { username: 'cli', password: 'cli', role: 'cliente' },
  ]);

  const services = ['Coletar equipamento', 'Devolver equipamento', 'Reparar equipamento', 'Configurar equipamento'];

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const toggleServiceSelection = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((item) => item !== service)
        : [...prevSelected, service]
    );
  };

  const confirmAppointment = () => {
    if (name && selectedServices.length > 0 && phone && selectedDate && selectedTime) {
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        { key: Math.random().toString(), name, services: selectedServices, phone, date: selectedDate, time: selectedTime, status: 'Pendente' },
      ]);
      alert('Agendamento confirmado!');
      setName('');
      setSelectedServices([]);
      setPhone('');
      setSelectedDate('');
      setSelectedTime('');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setUserRole(user.role);
      setScreen(user.role === 'admin' ? 'admin' : 'cliente');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const handleBack = () => {
    setScreen('home');
    setUserRole('');
    setUsername('');
    setPassword('');
  };

  const handleRegister = () => {
    if (newUsername && newPassword) {
      const newUser = { username: newUsername, password: newPassword, role: 'cliente' };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      alert('Cadastro realizado com sucesso!');
      setScreen('home');
      setNewUsername('');
      setNewPassword('');
    } else {
      alert('Por favor, preencha todos os campos de cadastro.');
    }
  };

  const handleStatusChange = (itemKey, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.key === itemKey ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  if (screen === 'home') {
    return (
      <View style={styles.home.container}>
        <Image source={require('./assets/Inovatilogo.png')} style={styles.home.logo} />
        <Text style={styles.home.title}>Bem-vindo ao nosso app de agendamento.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flex: 0.5, marginRight: 10 }}>
            <TouchableOpacity style={styles.home.button} onPress={() => setScreen('login')}>
              <Text style={styles.home.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.5, marginLeft: 10 }}>
            <TouchableOpacity style={styles.home.button} onPress={() => setScreen('register')}>
              <Text style={styles.home.buttonText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.home.contact}>
          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+5585982134686')}>
            <Text style={styles.home.link}>WhatsApp</Text>
          </TouchableOpacity>
          <Text style={styles.home.link}>          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/InovatiSolutions')}>
            <Text style={styles.home.link}>Instagram</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.home.footerText2}>App desenvolvido para fins acadêmicos.</Text>
        <Text style={styles.home.footerText}>Desenvolvido por Rafael Furtado</Text>
      </View>
    );
  }  

  if (screen === 'register') {
    return (
      <View style={styles.register.container}>
        <Text style={styles.register.title}>Cadastro</Text>
        <TextInput
          style={[styles.register.input, { color: '#FFFFFF' }]}
          placeholder="Novo Usuário"
          value={newUsername}
          onChangeText={setNewUsername}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={[styles.register.input, { color: '#FFFFFF' }]}
          placeholder="Nova Senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#FFFFFF"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flex: 0.5, marginRight: 10 }}>
            <TouchableOpacity style={styles.register.button} onPress={handleBack}>
              <Text style={styles.register.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.5, marginLeft: 10 }}>
            <TouchableOpacity style={styles.register.button} onPress={handleRegister}>
              <Text style={styles.register.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  
  if (screen === 'login') {
    return (
      <View style={styles.login.container}>
        <Text style={styles.login.title}>Login</Text>
        <TextInput 
          style={[styles.login.input, { color: '#FFFFFF' }]}
          placeholder="Usuário" 
          value={username} 
          onChangeText={setUsername} 
          placeholderTextColor="#FFFFFF"
        />
        <TextInput 
          style={[styles.login.input, { color: '#FFFFFF' }]}
          placeholder="Senha" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
          placeholderTextColor="#FFFFFF"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 15 }}>
            <TouchableOpacity style={styles.login.button} onPress={handleBack}>
              <Text style={styles.login.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <TouchableOpacity style={styles.login.button} onPress={handleLogin}>
              <Text style={styles.login.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  

  if (screen === 'admin') {
    return (
      <View style={[styles.admin.container, { flex: 1 }]}>
        <View style={styles.admin.container}>
          <Text style={styles.admin.title}>Admin - Agendamentos</Text>
          <FlatList
            data={appointments}
            renderItem={({ item }) => (
              <View style={styles.admin.appointment}>
                <Text style={{ color: '#FFFFFF' }}>{item.name} - {item.services.join(', ')}</Text>
                <Text style={{ color: '#FFFFFF' }}>{item.phone}</Text>
                <Text style={{ color: '#FFFFFF' }}>{item.date} às {item.time}</Text>
                <Text style={{ color: '#FFFFFF' }}>Status: {item.status}</Text>
                <Picker
                  style={{ width: 200, color: '#FFFFFF' }}
                  selectedValue={item.status}
                  onValueChange={(status) => handleStatusChange(item.key, status)}
                >
                  <Picker.Item label="Pendente" value="Pendente" />
                  <Picker.Item label="Em andamento" value="Em andamento" />
                  <Picker.Item label="Atendido" value="Atendido" />
                  <Picker.Item label="Cancelado" value="Cancelado" />
                </Picker>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ flex: 0.5, marginRight: 10, marginTop: 10 }}>
              <TouchableOpacity style={styles.admin.button} onPress={handleBack}>
                <Text style={styles.admin.buttonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (screen === 'cliente') {
    return (
      <ScrollView contentContainerStyle={styles.cliente.container}>
        <Text style={styles.cliente.title}>Agendar Horário</Text>
        <TextInput
          style={[styles.cliente.input, { color: '#FFFFFF' }]}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={[styles.cliente.input, { color: '#FFFFFF' }]}
          placeholder="Telefone de contato"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={setPhone}
          placeholderTextColor="#FFFFFF"
        />
        
        <Text style={[styles.cliente.label, { color: '#FFFFFF' }]}>Selecione os tipos de serviço:</Text>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.cliente.serviceButton,
                selectedServices.includes(item) && styles.cliente.selectedServiceButton,
              ]}
              onPress={() => toggleServiceSelection(item)}
            >
              <Text style={styles.cliente.serviceText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          horizontal
          style={{ 
            height: 50,
            alignSelf: 'flex-start',
            marginTop: 70,
          }}
        />
                
        <Calendar
          style={styles.cliente.calendar}
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#0EE8D8' },
          }}
        />
  
        {selectedDate && (
          <View>
            <Text style={styles.cliente.availableTimesLabel}>
              Horários disponíveis para {selectedDate}:
            </Text>
            {availableTimes.map((time) => {
              const isTimeUnavailable = appointments.some(
                (appointment) => appointment.date === selectedDate && appointment.time === time
              );
              return (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.cliente.timeButton,
                    selectedTime === time && styles.cliente.selectedTimeButton,
                    isTimeUnavailable && styles.cliente.unavailableTimeButton
                  ]}
                  onPress={() => setSelectedTime(time)}
                  disabled={isTimeUnavailable}
                >
                  <Text>{time}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flex: 0.5, marginRight: 10, marginTop: 10 }}>
            <TouchableOpacity style={styles.cliente.button} onPress={handleBack}>
              <Text style={styles.cliente.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 10, marginTop: 10 }}>
            <TouchableOpacity style={styles.cliente.confirmButton} onPress={confirmAppointment}>
              <Text style={styles.cliente.confirmButtonText}>Confirmar Agendamento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }  

  return null;
}

const styles = StyleSheet.create({
  home: {
    container: {
      marginTop: -20,
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#292929',
      alignItems: 'center',
    },
    logo: {
      marginTop: 20,
      width: 400,
      height: 400,
      resizeMode: 'contain',
      marginBottom: -80,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 50,
      color: '#0EE8D8',
      marginBottom: 80,
    },
    button: {
      backgroundColor: '#0EE8D8',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center'
    },
    buttonText: {
      color: '#00000',
      fontWeight: 'bold',
    },
    contact: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 100,
    },
    link: {
      fontSize: 20,
      color: '#0EE8D8',
    },
    footerText: {
      position: 'absolute',
      bottom: 10,
      fontSize: 10,
      color: 'gray',
      textAlign: 'center',
      width: '100%',
    },
    footerText2: {
      position: 'absolute',
      bottom: 25,
      fontSize: 10,
      color: 'gray',
      textAlign: 'center',
      width: '100%',
    },
  },
  register: {
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#292929',
      alignItems: 'center',
    },
    title: {
      marginTop: 200,
      fontSize: 26,
      fontWeight: 'bold',
      marginVertical: 20,
      color: '#0EE8D8',
      marginBottom: 70,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 20,
      marginVertical: 10,
      borderRadius: 5,
    },
    button: {
      backgroundColor: '#0EE8D8',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#00000',
      fontWeight: 'bold',
    },
  },
  login: {
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#292929',
      alignItems: 'center',
    },
    title: {
      marginTop: 200,
      fontSize: 26,
      fontWeight: 'bold',
      marginVertical: 20,
      color: '#0EE8D8',
      marginBottom: 70,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 20,
      marginVertical: 10,
      borderRadius: 5,
    },
    button: {
      backgroundColor: '#0EE8D8',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center'
    },
    buttonText: {
      color: '#00000',
      fontWeight: 'bold',
    },
  },
  admin: {
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#292929',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      color: '#0EE8D8',
      marginBottom: 20,
    },
    appointment: {
      padding: 70,
      borderBottomWidth: 2,
      borderBottomColor: '#0EE8D8',
      paddingVertical: 10,
      marginBottom: 40,
    },
    button: {
      backgroundColor: '#0EE8D8',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#00000',
      fontWeight: 'bold',
    },
  },
  cliente: {
    container: {
      marginTop: 0,
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#292929',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      color: '#0EE8D8',
    },
    input: {
      marginTop: 30,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 15,
      marginVertical: 10,
      borderRadius: 5,
    },
    label: {
      marginTop: 20,
      fontSize: 16,
      marginVertical: 60,
      fontWeight: 'bold',
      marginBottom: -20,
    },
    serviceButton: {
      height: 40,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginBottom: 0,
    },
    selectedServiceButton: {
      backgroundColor: '#0EE8D8',
      marginBottom: 50,
    },
    serviceText: {
      color: '#00000',
      fontWeight: 'bold',
    },
    timeButton: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      marginVertical: 5,
      borderRadius: 5,
    },
    calendar: {
      marginTop: 10,
      marginBottom: 10,
    },
    unavailableTimeButton: {
      backgroundColor: '#ff4d4d',
    },
    selectedTimeButton: {
      backgroundColor: '#0EE8D8',
    },
    button: {
      marginTop: 10,
      backgroundColor: '#0EE8D8',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#00000',
      fontWeight: 'bold',
    },
    confirmButton: {
      marginTop: 10,
      backgroundColor: '#0EE8D8',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: '#00000',
      fontWeight: 'bold',
    },
    availableTimesLabel: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
});
