// Importações de componentes do Expo e do React Native
import { StatusBar } from 'expo-status-bar'; // Controla a barra de status do celular (hora, bateria)
import { useState } from 'react'; // Hook para criar estados (variáveis que atualizam a tela)
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
    // ESTADOS
    // 'novaTarefa' guarda o texto que o usuário está digitando no input agora
    const [novaTarefa, setNovaTarefa] = useState('');
    // 'listaTarefas' guarda o array com todos os objetos de tarefas adicionados
    const [listaTarefas, setListaTarefas] = useState([]);

    // FUNÇÃO PARA ADICIONAR
    const adicionarTarefa = () => {
        // Se o texto estiver vazio (ou só espaços), a função para aqui
        if (novaTarefa.trim() === '') return;

        // Criamos um objeto único para a tarefa
        const tarefaObjeto = {
            id: String(Date.now()), // Usa o tempo atual como ID único
            texto: novaTarefa, // O texto que estava no estado 'novaTarefa'
        };

        // Atualiza a lista: pega o que já tinha (...listaTarefas) e soma o novo objeto
        setListaTarefas([...listaTarefas, tarefaObjeto]);

        // Limpa o campo de texto após adicionar
        setNovaTarefa('');
    };

    // FUNÇÃO PARA REMOVER
    const removerTarefa = (idParaRemover) => {
        // Cria uma nova lista mantendo apenas os itens que NÃO possuem o ID clicado
        const listaFiltrada = listaTarefas.filter((item) => item.id !== idParaRemover);
        // Atualiza o estado com a lista reduzida
        setListaTarefas(listaFiltrada);
    };

    return (
        <View style={styles.container}>
            {/* Título do App */}
            <Text style={styles.titulo}>Minhas Tarefas</Text>

            {/* ÁREA DE ENTRADA (Input + Botão) */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="O que vamos fazer hoje?"
                    value={novaTarefa} // Vincula o texto ao estado
                    onChangeText={setNovaTarefa} // Atualiza o estado conforme digita
                />
                <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
                    <Text style={styles.textoBotaoAdicionar}>+</Text>
                </TouchableOpacity>
            </View>

            {/* LISTA DE TAREFAS */}
            <FlatList
                data={listaTarefas} // Fonte dos dados
                keyExtractor={(item) => item.id} // Identificador único de cada item
                renderItem={({ item }) => (
                    // Design de cada linha da lista
                    <View style={styles.itemLista}>
                        <Text>{item.texto}</Text>

                        {/* Botão de excluir */}
                        <TouchableOpacity
                            style={styles.botaoRemover}
                            onPress={() => removerTarefa(item.id)}>
                            <Text style={styles.textoBotaoRemover}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                // O que aparece quando a lista está vazia
                ListEmptyComponent={() => (
                    <Text style={styles.textoVazio}>
                        Nenhuma tarefa por aqui. Você está livre! 🏖️
                    </Text>
                )}
            />

            {/* Configuração da barra de status do sistema */}
            <StatusBar style="auto" />
        </View>
    );
}

// ESTILIZAÇÃO (CSS do React Native)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    botaoAdicionar: {
        width: 50,
        height: 50,
        backgroundColor: '#d80000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    textoBotaoAdicionar: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemLista: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    textoItem: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    botaoRemover: {
        backgroundColor: '#FF3B30',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotaoRemover: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    textoVazio: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 30,
    },
});
