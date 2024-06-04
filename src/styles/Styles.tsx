import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
        gap: 100
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        fontSize: 72,
        fontWeight: '600',
        color: '#fff'
    },
    text: {
        textAlign: 'center',
        fontSize: 44,
        fontWeight: '600',
        color: '#fff'
    },
    subtext: {
        textAlign: 'center',
        fontSize: 28,
        color: '#fff'
    },
    infos: {
        textAlign: 'center',
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#fff'
    },
    smallGap:{
        gap: 4
    },
    gap:{
        gap: 16
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
});