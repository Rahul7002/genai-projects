import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type MessageInputProps = {
    onSend: (message: string) => void;
    disabled?: boolean;
};

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (disabled) {
            return;
        }
        const message = text.trim();

        if (!message) {
            return;
        }

        onSend(message);
        setText('');
    };

    return (
        <View style={styles.bottomBar}>
            {/* Attachment / Plus Button */}
            <TouchableOpacity style={styles.plusButton}>
                <Feather name="plus" size={20} color="#555" />
            </TouchableOpacity>

            {/* Text Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Message"
                    placeholderTextColor="#8e8e93"
                    value={text}
                    onChangeText={setText}
                    multiline
                    autoFocus
                />
            </View>

            {/* Send Button */}
            <TouchableOpacity
                style={[
                    styles.sendButton,
                    text.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
                ]}
                onPress={handleSend}
                disabled={!text.trim()}
            >
                <Ionicons
                    name="arrow-up"
                    size={20}
                    color={text.trim() ? '#fff' : '#666'}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },
    plusButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#f2f2f7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
    },
    inputContainer: {
        flex: 1,
        minHeight: 40,
        maxHeight: 120,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e5ea',
        paddingHorizontal: 14,
        justifyContent: 'center',
    },
    sendButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
    },
    textInput: {
        fontSize: 16,
        color: '#000000',
        paddingTop: 8,
        paddingBottom: 8,
    },
    sendButtonActive: {
        backgroundColor: '#000000',
    },
    sendButtonInactive: {
        backgroundColor: '#e5e5ea',
    },
   
});