import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
    const [novaTarefa, setNovaTarefa] = useState('');
    const [listaTarefas, setListaTarefas] = useState([]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() === '') return;

        const tarefaObjeto = {
            id: String(Date.now()),
            texto: novaTarefa,
        };

        setListaTarefas([...listaTarefas, tarefaObjeto]);
        setNovaTarefa('');
    };

    const removerTarefa = (idParaRemover) => {
        const listaFiltrada = listaTarefas.filter((item) => item.id !== idParaRemover);
        setListaTarefas(listaFiltrada);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Minhas Tarefas</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="O que vamos fazer hoje?"
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />
                <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
                    <Text style={styles.textoBotaoAdicionar}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={listaTarefas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemLista}>
                        <Text>{item.texto}</Text>
                        <TouchableOpacity
                            style={styles.botaoRemover}
                            onPress={() => removerTarefa(item.id)}>
                            <Text style={styles.textoBotaoRemover}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.textoVazio}>
                        {' '}
                        {}
                        Nenhuma tarefa por aqui. Você está livre! 🏖️
                    </Text>
                )}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    botaoAdicionar: {
        width: 50,
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    textoBotaoAdicionar: {
        color: '#fff',
        fontSize: 24,
    },
    itemLista: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#eee',
    },
    botaoRemover: {
        backgroundColor: '#ff5252',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotaoRemover: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textoVazio: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
});
