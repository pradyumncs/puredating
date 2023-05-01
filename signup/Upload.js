import { View, Text, Image, StyleSheet } from 'react-native';
import { Input } from "react-native-elements";
import React from 'react'

import { useNavigation, useRoute } from '@react-navigation/native';
import pr from '../assets/progress5.png';
import { Button, TouchableOpacity, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useTailwind } from "tailwind-rn";
import * as ImagePicker from 'expo-image-picker';
import { firebase, storage } from "../firebase";
import { async } from '@firebase/util';
import { Alert } from 'react-native';
import pbar from '../assets/zas.gif';
import useAuth from "../hooks/useAuth";
import { Foundation, Ionicons, AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    collection,
    doc,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "@firebase/firestore";
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';

const Upload = () => {
    const tw = useTailwind();
    const [Username, setUsername] = React.useState("");
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();

    const incompleteForm = !image;
    const [Age, setAge] = React.useState("");
    const route = useRoute();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [p, setp] = useState("");
    const [buttonTitle, setButtonTitle] = useState("Continue");
    const { user } = useAuth();
    const [done, setDone] = useState(null);
    const [Showed, setShowed] = useState(false)

    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }




    var city;
    var imageuria;
    var z;
    var numz;
    const [fontsLoaded] = useFonts({
        'NexaBold': require('../assets/NexaBold.otf'),
    });







    var itemsnamesS = Array("a");
    var di = itemsnamesS[Math.floor(Math.random() * itemsnamesS.length)];
    var SubRegion = String(di);
    console.log(SubRegion)

    var States = "Dubai"

    var Showme = "Men"
    var count = 1

    var Country = "USA"

    var gender = "Female"

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function numberid(length) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    const metadata = {
        contentType: 'image/png',
    };

    console.log();


    console.log(z)


    console.log("hi")
    console.log(numz)
    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [7, 10],
            quality: 0.9

        })

        const source = { uri: result.uri };
        console.log(source);

        setImage(source);

        setp(result.uri);
        console.log(result.uri)
        console.log(result.uri)
        global = result.uri
        console.log(global)


    };

    const handlesub = async () => {
        setShowed(true)

        var itemsnames = Array("Emily", "Hannah", "Alexis", "Sarah", "Samantha", "Ashley", "Madison", "Taylor", "Jessica", "Elizabeth", "Alyssa", "Lauren", "Kayla", "Brianna", "Megan", "Victoria", "Emma", "Abigail", "Rachel", "Olivia", "Jennifer", "Amanda", "Sydney", "Morgan", "Nicole", "Jasmine", "Grace", "Destiny", "Anna", "Julia", "Haley", "Alexandra", "Kaitlyn", "Natalie", "Brittany", "Katherine", "Stephanie", "Rebecca", "Maria", "Allison", "Amber", "Savannah", "Danielle", "Courtney", "Mary", "Gabrielle", "Brooke", "Jordan", "Sierra", "Sara", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z");
        var na = itemsnames[Math.floor(Math.random() * itemsnames.length)];
        var displayName = String(na);
        console.log(displayName)


        numz = numberid(10)


        var items = Array(13, 14, 15, 16, 17, 18, 19);
        var a = items[Math.floor(Math.random() * items.length)];
        var age = String(a);
        console.log(age)


        z = '00' + makeid(27)


        image.uri = `https://photodating.s3.ap-south-1.amazonaws.com/fireteens+(${count}).jpg`


        count = count + 1

        const response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);

        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
        console.log('filesss ' + image.uri);


        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            //   setDoc(doc(db, "images",), "userSwiped");
            //  let db = Firestore.firestore()
            //  //   db.collection("images").document().setData([filename])

        },




            (error) => {
                console.log(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    imageuria = String(downloadURL)


                    setDoc(doc(db, "users", z), {
                        id: z,
                        displayName: displayName,
                        Showme: Showme,
                        photoURL: image.uri,
                        gender: gender,
                        age: age,
                        Country: Country,
                        States: States,
                        SubRegion: SubRegion,
                        Number: numz,
                        timestamp: serverTimestamp(),
                    })
                        .then(() => {
                            console.log("done")
                            setDone("done");

                            navigation.navigate("Upload");
                        })
                        .catch((error) => {
                            alert(error.message);


                        });


                });




            }





        )







    }


    let text = 'Waiting..';
    if (done) {
        text = "done";


    } else if (location) {
        text = "waiting";
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handlesub();
        }, 6000);
        return () => clearInterval(interval);
    }, []);
    return (
        <View style={tw("flex-1 ")}>

            <View style={tw("items-center pt-1")}>

                <Image source={pr} />
                <Text >{text}</Text>
                <Text style={styles.buttonText}>
                    Add a Photo of You{"\n"}

                </Text>

            </View>

            <View style={tw("flex items-center justify-center h-1/2 w-full")}>
                <TouchableOpacity
                    //  onPress={() => navigation.goBack()}
                    style={tw("p-7")}
                >
                    <AntDesign name="pluscircle" size={50} color="black" onPress={pickImage} />
                </TouchableOpacity>

                <View style={styles.imageContainer}>


                    <TouchableOpacity style={styles.buttonTextsm} >

                        <Text> Please show your own Face </Text>
                    </TouchableOpacity>


                </View>

            </View>
            <View style={tw("flex-1 items-center  pt-1 mb-10")}>
                <TouchableOpacity

                    style={[
                        tw("w-64 p-3 rounded-xl  absolute bottom-1 bg-red-400"),
                        incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                    ]}

                    onPress={handlesub}

                >

                    <Text style={tw("text-center text-white text-xl")}>
                        {buttonTitle}
                    </Text>

                </TouchableOpacity>

            </View>


        </View >
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#e9f5f8",

    },
    buttonText: {
        color: "#000000",
        fontSize: 35,
        fontFamily: 'NexaBold',
    },
    buttonTextsm: {
        color: "#000000",
        fontSize: 15,
        padding: 10,
        fontFamily: 'NexaBold',

    },





});



export default Upload