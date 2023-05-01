import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ImageBackground, ScrollView, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { NavigationRouteContext, useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { useTailwind } from 'tailwind-rn/dist';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavigation from "./BottomNavigation";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header'
import bacg from '../assets/design2.png';
import { useFonts } from 'expo-font';
import Rectangle from '../assets/Rectangle.png'
import {
    collection,
    isGreaterThanOrEqualTo,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    orderBy,
    setDoc,
    where,
    limit,
} from "@firebase/firestore";
import { db } from "../firebase";
import like from '../assets/like.png';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({ navigation }) => {
    const androidPackageName = 'com.weconnectgroup.welocal';
    const { user, signOut } = useAuth();
    const [viewonboard, setViewonboard] = useState(false)
    const tw = useTailwind();
    const man = true
    const num = Math.floor(Math.random() * 100);

    console.log(num)
    console.log(num)


    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }

    const checkfirstpaywall = async () => {
        try {
            const value = await AsyncStorage.getItem('@viewonboardingg');

            console.log(value)
            if (value == 'true') {
                setViewonboard(true)

            }
        }

        catch (err) {
            console.log('Error @checkfirstpaywall ', err)
        }
    }










    useLayoutEffect(
        () =>
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {

                if (!snapshot.exists()) {
                    navigation.navigate("Name");
                }
            }),
        []
    );

    useLayoutEffect(
        () =>
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                console.log("chec- first snapshot")
                if (snapshot.exists()) {
                    navigation.navigate("PremiumOffers");
                }


            }),



        []
    );

    return (
        <View style={tw("items-center ")}>

            <ImageBackground resizeMode="stretch"
                style={styles.img}>

                <Image style={styles.image} source={require("../appassets/couple.jpg")} />
                <View style={tw("p-2")}>

                    <View style={tw("p-3")}></View>

                    <TouchableOpacity
                        style={[tw("rounded-3xl p-3 px-20"),
                        styles.shadow, styles.premiumpurple]}
                        onPress={() => navigation.navigate("Premiumoffer")}
                    >
                        <Text style={tw("text-center text-white text-lg ")}>
                            Get 90% Off - Today
                        </Text>


                    </TouchableOpacity>
                    <View style={tw("p-32")}></View>


                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    setFontSize: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    setBorder:
    {
        width: 170,  // Setting up image width. 
        height: 170,  // Setting up image height.  
        borderWidth: 3,  // Set border width.  
        borderColor: '#F44336',  // Set border Hex Color code here.   
    },
    setBorderRadius:
    {
        width: 170,  // Setting up image width. 
        height: 170,  // Setting up image height.  
        borderWidth: 4,  // Set border width.  
        borderColor: '#ca5cdd',  // Set border Hex Color code here. 
        borderRadius: 99,


        // Set border Radius.   
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
    rectangle: {
        height: 128,
        width: 128,
        backgroundColor: 'salmon',

    },
    premiumpurple: {
        backgroundColor: "#be00ff",
    },
    image: {
        height: 500,
        width: 400,
    },
    buttonText: {
        color: "#000000",
        fontSize: 15,
        fontFamily: 'SFBold',
    },
    buttonTextname: {
        color: "#000000",
        fontSize: 25,
        fontFamily: 'SFBold',
    },
    buttonTextBold: {
        color: "#000000",
        fontSize: 20,
        fontFamily: 'SFBold',
        fontWeight: 'bold'

    },
    img: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    dashcolor: {
        color: "#808080",
    }


});


export default Welcome