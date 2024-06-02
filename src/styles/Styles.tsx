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
        padding: 20
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
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
});