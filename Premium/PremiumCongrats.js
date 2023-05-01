import { View, Text, StyleSheet, FlatList, Alert, Dimensions, TouchableOpacity, BackHandler, Image, useWindowDimensions, Animated, ImageBackground, Linking } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Toast from 'react-native-toast-message';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationRouteContext, useNavigation } from "@react-navigation/core";
import { useTailwind } from "tailwind-rn";
import { Platform } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import PackageItem from '../Premium/PackageItem'
import { ScrollView } from 'react-native'

const { width, height } = Dimensions.get('window');

const PremiumCongrats = () => {
    const tw = useTailwind();
    const navigation = useNavigation();
    return (

        <View style={tw("flex-1")}>

            <ImageBackground
                resizeMode="cover"
                style={tw("flex-1")}
                source={require("../assets/congratspremiums.png")}>
                <View style={tw("p-40")} />
                <View style={tw("p-20")} />

                <TouchableOpacity
                    style={[tw("rounded-3xl p-5 px-2"),
                    styles.shadow, styles.premiumpurple]}
                    onPress={() => navigation.navigate("Welcome")}
                >
                    <Text style={tw("text-center text-white text-xl ")}>
                        To Activate Premium . Please Close and restart the App Completely
                    </Text>


                </TouchableOpacity>

            </ImageBackground >
        </View>

    )
}

export default PremiumCongrats

const styles = StyleSheet.create({
    img: {

        justifyContent: 'center',
        alignItems: 'center',
        width: 1300,
        height: 2400,
    },
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 5.65,

        elevation: 5,
    },
    premiumpurple: {
        backgroundColor: "#be00ff",
    },
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 8.65,

        elevation: 8,
    },



});