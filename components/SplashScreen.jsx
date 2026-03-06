import { View, Text, Image } from 'react-native';

export default function CustomSplash() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('@/assets/images/icon.png')}
        style={{ width: 140, height: 140, marginBottom: 16 }}
        resizeMode="contain"
      />

      <Text style={{ color: '#fff', fontSize: 18 }}>
        Loading...
      </Text>
    </View>
  );
}
