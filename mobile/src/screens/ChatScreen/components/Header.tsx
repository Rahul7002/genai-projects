import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

export default function Header() {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={styles.headerButton}
            >
                <Feather name="menu" size={24} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>ChatGPT</Text>
                <Text style={styles.headerSubtitle}> 3.5-flash-lite</Text>
                <Feather name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={styles.headerButton}
            >
                <Feather name="edit" size={20} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    headerButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
    },
    headerSubtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#8e8e93',
        marginRight: 4,
    },
})