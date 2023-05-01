import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ImageBackground, Modal, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationRouteContext, useNavigation } from "@react-navigation/core";
import InAppReview from 'react-native-in-app-review';
import { FontAwesome } from '@expo/vector-icons';
import useAuth from "../hooks/useAuth";
import { useTailwind } from 'tailwind-rn/dist';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import bacg from '../assets/design2.png';
import item from '../assets/inactive.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import star from '../assets/star.png';
import calling from '../assets/callhomescreen.png';
import messages from '../assets/messagehomescreen.png';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNavigation from "./BottomNavigation";
import Purchases from 'react-native-purchases';
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
import generateId from "../lib/generateid";




const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, signOut } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [prome, setProme] = useState([]);
    const swipeRef = useRef(null);
    const [cd, setcd] = useState([]);
    const tw = useTailwind();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPremiuma, setModalPremiuma] = useState(false);
    const [modalVisibleyescall, setModalVisibleyescall] = useState(false);
    const [modalVisiblenocall, setModalVisiblenocall] = useState(false);
    const [modalVisiblenomessage, setModalVisiblenomessage] = useState(false);
    const [modalVisibleyesback, setModalVisibleyesback] = useState(false);
    const [modalVisiblenoback, setModalVisiblenoback] = useState(false);
    const [userstatepro, setUserstatepro] = useState(false);
    const [viewonboard, setViewonboard] = useState(false)
    const [noo, setnoo] = useState('');


    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }



    var left
    var ShowmeWhoo
    var Showmemes
    var UserImage
    let arrbooks = []
    let books = []
    var sita




    InAppReview.isAvailable();

    // trigger UI InAppreview
    InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully) => {
            // when return true in android it means user finished or close review flow
            console.log('InAppReview in android', hasFlowFinishedSuccessfully);

            // when return true in ios it means review flow lanuched to user.
            console.log(
                'InAppReview in ios has launched successfully',
                hasFlowFinishedSuccessfully,
            );

            // 1- you have option to do something ex: (navigate Home page) (in android).
            // 2- you have option to do something,
            // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

            // 3- another option:
            if (hasFlowFinishedSuccessfully) {
                // do something for ios
                // do something for android
            }

            // for android:
            // The flow has finished. The API does not indicate whether the user
            // reviewed or not, or even whether the review dialog was shown. Thus, no
            // matter the result, we continue our app flow.

            // for ios
            // the flow lanuched successfully, The API does not indicate whether the user
            // reviewed or not, or he/she closed flow yet as android, Thus, no
            // matter the result, we continue our app flow.
        })
        .catch((error) => {
            //we continue our app flow.
            // we have some error could happen while lanuching InAppReview,
            // Check table for errors and code number that can return in catch.
            console.log(error);
        });

    useLayoutEffect(
        () =>
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                if (!snapshot.exists()) {
                    navigation.navigate("Name");
                }
            }
            ),
        []
    );







    useEffect(() => {
        const magic = async () => {
            Purchases.setDebugLogsEnabled(true);


            const CustomerInfo = await Purchases.getCustomerInfo();
            if (typeof CustomerInfo.entitlements.active['pro'] !== "undefined") {


                setUserstatepro(true)

            }
            else {



                setUserstatepro(false)

            }
        }
        magic();
    }, []);

    useEffect(() => {
        let unsub;



        const fetchCards = async () => {
            const passes = await getDocs(
                collection(db, "users", user.uid, "passes")
            ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

            const swipes = await getDocs(
                collection(db, "users", user.uid, "swipes")
            ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            console.log(docSnap.data())
            console.log(docSnap.data())



            let z = docSnap.data()
            let Showmed = (z.Showme)


            console.log(Showmed)
            if (Showmed == "Men") {
                Showmemes = "Male"
            }
            else {
                Showmemes = "Female"

            }

            console.log(Showmemes)



            const passedUserIds = passes.length > 0 ? passes : ["test"];
            const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

            console.log([...passedUserIds, ...swipedUserIds]);


            const ar = collection(db, "users")
            // // const r = query(ar, where("displayName", "==", "G"))
            // const q = query(r, where("age", "==", "22"))

            //  const q = query(m, where("age", "==", "22"));
            //  const q = query(m, where("age", "==", "33"));
            const zad = ([...passedUserIds, ...swipedUserIds]);

            let asa = []
            const m = query(ar,)
            const q = query(m, where("gender", "==", Showmemes), orderBy("timestamp", "desc"), limit(300));

            unsub = onSnapshot(
                q,
                (snapshot) => {
                    setProfiles(
                        snapshot.docs


                            .map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }))

                            .filter((doc) => doc.id !== user.uid)

                            //    .filter(element => element.gender == Showmemes)

                            .filter(i => !zad.includes(i.id))





                    );
                }
            );





        };



        console.log(profiles);





        //  profiles = profiles.filter(element => element.Showme == ShowmeWhoo)
        //  console.log(profiles)





        fetchCards();
        return unsub;

    }, []);






    const swipeLeft = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log(`You swiped PASS on ${userSwiped.displayName}`);

        setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    };


    const swipeRight = async (cardIndex) => {

        {
            userstatepro ?
                console.log("madara")
                :
                console.log("dyee")
        }

        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await (
            await getDoc(doc(db, "users", user.uid))
        ).data();

        //Check if the user swiped on you...
        getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
            (documentSnapshot) => {
                if (documentSnapshot.exists()) {
                    //user has matched with you before you matched with them...
                    //Create a MATCH!
                    console.log(`Hooray, you matched with ${userSwiped.displayName}`);
                    setDoc(
                        doc(db, "users", user.uid, "swipes", userSwiped.id),
                        userSwiped
                    );
                    //CREATE A MATCH!
                    setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
                        users: {
                            [user.uid]: loggedInProfile,
                            [userSwiped.id]: userSwiped,
                        },
                        usersMatched: [user.uid, userSwiped.id],
                        timestamp: serverTimestamp(),
                    });

                    navigation.navigate("Match", {
                        loggedInProfile,
                        userSwiped,
                    });
                } else {
                    //User has swiped as first interaction between the two or didn't get swiped on...
                    console.log(
                        `You swiped on ${userSwiped.displayName} `
                    );
                    setDoc(
                        doc(db, "users", user.uid, "swipes", userSwiped.id),
                        userSwiped
                    );
                }
            }
        );



        //User has swiped as first interaction between the two...
        console.log(`You swiped on ${userSwiped.displayName} `);
        setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
    };


    const swipeRightyo = async (cardIndex) => {



        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await (
            await getDoc(doc(db, "users", user.uid))
        ).data();

        //Check if the user swiped on you...
        getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
            (documentSnapshot) => {

                //user has matched with you before you matched with them...
                //Create a MATCH!
                console.log(`Hooray, you matched with ${userSwiped.displayName}`);
                setDoc(
                    doc(db, "users", user.uid, "swipes", userSwiped.id),
                    userSwiped
                );
                //CREATE A MATCH!
                setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
                    users: {
                        [user.uid]: loggedInProfile,
                        [userSwiped.id]: userSwiped,
                    },
                    usersMatched: [user.uid, userSwiped.id],
                    timestamp: serverTimestamp(),
                });

                navigation.navigate("Match", {
                    loggedInProfile,
                    userSwiped,
                });

            }
        );

        //User has swiped as first interaction between the two...
        console.log(`You swiped on ${userSwiped.displayName} `);
        setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
    };

    const moreinfofunc = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log(`so the information is  ${userSwiped.displayName}`);


    };

    const swipedown = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log(`so the information is  ${userSwiped.displayName}`);


    };

    const funcs = () => {
        return (

            <View>
                <Text>madra</Text>
            </View>
        )
    }

    return (

        <SafeAreaView style={tw("flex-1")}>
            {userstatepro ?
                <View style={tw("absolute top-0.5 left-2 item-center")}>


                    {/* Header */}
                    <TouchableOpacity
                        style={tw("rounded-3xl w-20 h-8  item-center ")}
                        onPress={() => setModalVisibleyesback(!modalVisibleyesback)}

                    >
                        <View style={tw(" items-center pt-1")}>
                            <Image style={styles.titleimage} source={require("../assets/goback.png")} />


                        </View>

                    </TouchableOpacity>
                </View>

                :
                <View style={tw("absolute left-2 item-center")}>


                    {/* Header */}
                    <TouchableOpacity
                        style={tw("rounded-3xl w-20 h-20 item-center ")}
                        onPress={() => setModalVisiblenoback(!modalVisiblenoback)}

                    >
                        <View style={tw(" items-center pt-1")}>
                            <Image style={styles.gobacimage} source={require("../assets/goback2.png")} />


                        </View>

                    </TouchableOpacity>
                </View>

            }


            <View style={tw("absolute top-3 right-3 item-center")}>

                {/* Header */}
                <TouchableOpacity
                    style={tw("rounded-3xl w-20 h-8 bg-pink-200 item-center ")}
                    onPress={() => navigation.navigate("Premiumoffer")}

                >
                    <View style={tw("flex-row items-center pt-1")}>
                        <MaterialCommunityIcons name="brightness-percent" size={20} color="pink" />
                        <Text style={tw("text-center text-pink-600 font-bold text-base")}>
                            90% Off
                        </Text>

                    </View>

                </TouchableOpacity>
            </View>



            <View style={tw("items-center")}>






                <TouchableOpacity >
                    <Image style={styles.titleimage} source={require("../appassets/title.png")} />


                </TouchableOpacity>


            </View>

            {/* End of Header */}
            {/* Cards */}
            <View style={tw("flex-1 -mt-9")}>

                {
                    userstatepro ?

                        <Swiper
                            ref={swipeRef}
                            containerStyle={{ backgroundColor: "transparent" }}
                            cards={profiles}
                            stackSize={2}
                            cardIndex={0}
                            stackSeparation={14}
                            verticalSwipe={true}

                            animateCardOpacity
                            onSwipedLeft={(cardIndex) => {
                                console.log("Swipe PASS");
                                swipeLeft(cardIndex);





                            }}

                            goBackToPreviousCardOnSwipeBottom={(cardIndex) => {
                                console.log("Get more information");

                            }}

                            onSwipedRight={(cardIndex) => {
                                {
                                    userstatepro ?

                                        swipeRightyo(cardIndex)
                                        :

                                        swipeRight(cardIndex)


                                }

                                {
                                    let count = cardIndex
                                    if (count == 0) {
                                        setModalPremiuma(!modalPremiuma)
                                        console.log(count)
                                    }


                                }




                            }}

                            onTapCard={(cardIndex) => {
                                console.log("Get more information");
                                moreinfofunc(cardIndex);
                            }}
                            animateOverlayLabelsOpacity
                            overlayLabels={{
                                left: {
                                    title: <Entypo name="circle-with-cross" size={150} color="white" />,
                                    style: {
                                        label: {
                                            textAlign: "right",
                                            marginTop: 160,
                                            //   color: "red",
                                            fontSize: 55,
                                        },


                                    },
                                },
                                bottom: {

                                    title: <AntDesign name="retweet" size={200} color="purple" />,
                                    style: {
                                        label: {
                                            textAlign: "right",
                                            marginTop: 160,
                                            //   color: "red",
                                            fontSize: 55,
                                        },


                                    },
                                },
                                right: {

                                    title: <Ionicons name="heart-circle-sharp" size={150} color="red" />,
                                    style: {
                                        label: {
                                            //color: "#4DED30",
                                            marginTop: 160,
                                        },
                                    },
                                },
                            }}
                            backgroundColor={"#4FD0E9"}
                            useViewOverflow={Platform.OS === "ios"}
                            renderCard={(card) =>
                                card ? (
                                    <View
                                        key={card.id}
                                        style={tw("relative bg-white h-5/6 rounded-xl")}
                                    >

                                        <Text>{card.firstName}</Text>
                                        <Image
                                            style={tw("absolute top-0 h-full w-full rounded-xl")}
                                            source={{ uri: card.photoURL }}
                                        />
                                        <View
                                            style={[
                                                tw(
                                                    "absolute bottom-4 justify-between flex-row w-full h-20 px-3 py-6 items-center"
                                                ),
                                                styles.cardShadow,
                                            ]}
                                        >
                                            <View>
                                                <Text style={tw("text-2xl font-bold text-white ")}>
                                                    {card.displayName}, {card.age}
                                                </Text>

                                            </View>



                                            {userstatepro ?
                                                <Text style={styles.textStylenum}>{card.Number}</Text>
                                                :
                                                <View></View>


                                            }








                                        </View>

                                    </View>



                                ) : (
                                    <View
                                        style={[
                                            tw(
                                                "relative bg-white h-5/6 rounded-xl justify-center items-center"
                                            ),
                                            styles.cardShadow,
                                        ]}
                                    >
                                        <Text style={tw("font-bold pb-5")}>Searching...</Text>
                                        <Image
                                            style={tw("w-32 h-32 rounded-full")}
                                            source={require("../assets/search.gif")}
                                        />
                                    </View>
                                )
                            }
                        />
                        :

                        <Swiper
                            ref={swipeRef}
                            containerStyle={{ backgroundColor: "transparent" }}
                            cards={profiles}
                            stackSize={2}
                            cardIndex={0}
                            stackSeparation={14}
                            verticalSwipe={true}

                            animateCardOpacity
                            onSwipedLeft={(cardIndex) => {
                                console.log("Swipe PASS");
                                swipeLeft(cardIndex);
                            }}



                            onSwipedRight={(cardIndex) => {
                                {
                                    userstatepro ?

                                        swipeRightyo(cardIndex)
                                        :

                                        swipeRight(cardIndex)


                                }

                                {
                                    let count = cardIndex
                                    if (count == 0) {
                                        setModalPremiuma(!modalPremiuma)
                                        console.log(count)
                                    }


                                }


                            }}

                            onTapCard={(cardIndex) => {
                                console.log("Get more information");
                                moreinfofunc(cardIndex);
                            }}
                            animateOverlayLabelsOpacity
                            overlayLabels={{
                                left: {
                                    title: <Entypo name="circle-with-cross" size={150} color="white" />,
                                    style: {
                                        label: {
                                            textAlign: "right",
                                            marginTop: 160,
                                            //   color: "red",
                                            fontSize: 55,
                                        },


                                    },
                                },
                                right: {

                                    title: <Ionicons name="heart-circle-sharp" size={150} color="red" />,
                                    style: {
                                        label: {
                                            //color: "#4DED30",
                                            marginTop: 160,
                                        },
                                    },
                                },
                            }}
                            backgroundColor={"#4FD0E9"}
                            useViewOverflow={Platform.OS === "ios"}
                            renderCard={(card) =>
                                card ? (
                                    <View
                                        key={card.id}
                                        style={tw("relative bg-white h-5/6 rounded-xl")}
                                    >

                                        <Text>{card.firstName}</Text>
                                        <Image
                                            style={tw("absolute top-0 h-full w-full rounded-xl")}
                                            source={{ uri: card.photoURL }}
                                        />
                                        <View
                                            style={[
                                                tw(
                                                    "absolute bottom-4 justify-between flex-row w-full h-20 px-3 py-6 items-center"
                                                ),
                                                styles.cardShadow,
                                            ]}
                                        >
                                            <View>
                                                <Text style={tw("text-2xl font-bold text-white ")}>
                                                    {card.displayName}, {card.age}
                                                </Text>

                                            </View>



                                            {userstatepro ?
                                                <Text style={styles.textStylenum}>{card.Number}</Text>
                                                :
                                                <View></View>


                                            }








                                        </View>

                                    </View>



                                ) : (
                                    <View
                                        style={[
                                            tw(
                                                "relative bg-white h-5/6 rounded-xl justify-center items-center"
                                            ),
                                            styles.cardShadow,
                                        ]}
                                    >
                                        <Text style={tw("font-bold pb-5")}>Searching...</Text>
                                        <Image
                                            style={tw("w-32 h-32 rounded-full")}
                                            source={require("../assets/search.gif")}
                                        />
                                    </View>
                                )
                            }
                        />


                }



            </View>
            <View
                style={tw("p-3")} />


            <View style={tw("flex flex-row justify-evenly p-4")}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalPremiuma}
                    onRequestClose={() => {

                        setModalPremiuma(!modalPremiuma);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.PremiumView}>

                            <ImageBackground
                                resizeMode="cover"
                                style={styles.premiumimg}
                                source={require("../appassets/offer.png")}
                            >
                                <TouchableOpacity style={[
                                    tw(
                                        "absolute top-0 right-0 "
                                    )

                                ]}>




                                </TouchableOpacity>
                                <View style={tw("p-3")}></View>

                                <TouchableOpacity
                                    style={[tw("rounded-3xl p-3 bg-yellow-400 absolute inset-x-0 bottom-5 "),
                                    styles.shadow]}
                                    onPress={() => navigation.navigate("Premiumoffer")}
                                >
                                    <Text style={tw("text-center text-black text-lg")}>
                                        Get Premium
                                    </Text>
                                </TouchableOpacity>

                                <View style={tw("p-3")}></View>
                                <View style={tw("p-1")} />
                            </ImageBackground>
                        </View>

                    </View>

                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <TouchableOpacity style={[
                                tw(
                                    "absolute top-0 right-0 "
                                )

                            ]}>

                                <AntDesign name="closecircle" size={40} color="black"
                                    onPress={() => setModalVisible(!modalVisible)}
                                />

                            </TouchableOpacity>
                            <Text style={styles.modalText}>Block and report this person</Text>
                            <Text style={styles.modalTexts}>Dont worry your feedback is anonymous and they wont know That youve blocked or reported them</Text>

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => swipeRef.current.swipeLeft()}
                            >

                                <Text style={styles.textStyle}>Fake Profile</Text>

                            </TouchableOpacity>
                            <View style={tw("p-1")} />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => swipeRef.current.swipeLeft()}
                            >

                                <Text style={styles.textStyle}>Innapropriate Content</Text>

                            </TouchableOpacity>
                            <View style={tw("p-1")} />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => swipeRef.current.swipeLeft()}
                            >

                                <Text style={styles.textStyle}>Scam </Text>

                            </TouchableOpacity>
                            <View style={tw("p-1")} />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => swipeRef.current.swipeLeft()}
                            >

                                <Text style={styles.textStyle}>Block</Text>

                            </TouchableOpacity>
                            <View style={tw("p-1")} />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => swipeRef.current.swipeLeft()}
                            >

                                <Text style={styles.textStyle}>Underage</Text>

                            </TouchableOpacity>
                            <View style={tw("p-1")} />
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => swipeRef.current.swipeLeft()}
                            >

                                <Text style={styles.textStyle}>Potential violations</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisiblenomessage}
                    onRequestClose={() => {

                        setModalVisiblenomessage(!modalVisiblenomessage);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <TouchableOpacity style={[
                                tw(
                                    "absolute top-0 right-0 "
                                )

                            ]}>

                                <AntDesign name="closecircle" size={40} color="black"
                                    onPress={() => setModalVisiblenomessage(!modalVisiblenomessage)}
                                />

                            </TouchableOpacity>
                            <Text style={styles.modalText}>To Instantly Match and Message this Person  </Text>
                            <View style={tw("p-1")} />
                            <Text style={styles.modalTextupgrade}> Please Upgrade to Premium ☑️ </Text>
                            <View style={tw("p-3")}></View>
                            <Image
                                style={tw("w-32 h-32 ")}
                                source={require("../assets/messagegif3.gif")}
                            />

                            <View style={tw("p-3")}></View>
                            <TouchableOpacity
                                style={[tw("rounded-2xl p-4 bg-yellow-400"),
                                styles.shadow]}
                                onPress={() => navigation.navigate("Premiumoffer")}
                            >
                                <Text style={tw("text-center  text-black text-xl")}>
                                    Continue
                                </Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisiblenoback}
                    onRequestClose={() => {

                        setModalVisiblenoback(!modalVisiblenoback);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.PremiumView}>

                            <ImageBackground
                                resizeMode="cover"
                                style={styles.premiumimg}
                                source={require("../assets/goback.png")}
                            >
                                <TouchableOpacity style={[
                                    tw(
                                        "absolute top-0 right-0 "
                                    )

                                ]}>




                                </TouchableOpacity>
                                <View style={tw("p-3")}></View>

                                <TouchableOpacity
                                    style={[tw("rounded-3xl p-3 bg-yellow-400 absolute inset-x-0 bottom-5 "),
                                    styles.shadow]}
                                    onPress={() => navigation.navigate("Premiumoffer")}
                                >
                                    <Text style={tw("text-center text-black text-lg")}>
                                        Get Premium
                                    </Text>
                                </TouchableOpacity>

                                <View style={tw("p-3")}></View>
                                <View style={tw("p-1")} />
                            </ImageBackground>
                        </View>

                    </View>

                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleyesback}
                    onRequestClose={() => {

                        setModalVisibleyesback(!modalVisibleyesback);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.PremiumView}>

                            <ImageBackground
                                resizeMode="cover"
                                style={styles.premiumimg}
                                source={require("../assets/gobackpro.png")}
                            >
                                <TouchableOpacity style={[
                                    tw(
                                        "absolute top-0 right-0 "
                                    )

                                ]}>




                                </TouchableOpacity>
                                <View style={tw("p-3")}></View>



                                <View style={tw("p-3")}></View>
                                <View style={tw("p-1")} />
                            </ImageBackground>
                        </View>

                    </View>

                </Modal>




                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisiblenocall}
                    onRequestClose={() => {

                        setModalVisiblenocall(!modalVisiblenocall);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <TouchableOpacity style={[
                                tw(
                                    "absolute top-0 right-0 "
                                )

                            ]}>

                                <AntDesign name="closecircle" size={40} color="black"
                                    onPress={() => setModalVisiblenocall(!modalVisiblenocall)}
                                />

                            </TouchableOpacity>
                            <Text style={styles.modalText}>To Get This Persons Number Immidietly  </Text>
                            <View style={tw("p-1")} />
                            <Text style={styles.modalTextupgrade}> Please Upgrade to Premium ☑️ </Text>

                            <Text style={styles.modalTexts}>Unlock this users number and start having a phone call</Text>
                            <Image
                                style={tw("w-20 h-20")}
                                source={require("../assets/callgif.gif")}
                            />
                            <View style={tw("p-3")}></View>
                            <Image style={styles.titlenumber} source={require("../assets/blurnumber.png")} />
                            <View style={tw("p-3")}></View>

                            <View style={tw("p-3")}></View>
                            <TouchableOpacity
                                style={[tw("rounded-2xl p-4 bg-yellow-400"),
                                styles.shadow]}
                                onPress={() => navigation.navigate("Premiumoffer")}
                            >
                                <Text style={tw("text-center text-black text-xl")}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                            <View style={tw("p-3")}></View>

                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleyescall}
                    onRequestClose={() => {

                        setModalVisibleyescall(!modalVisibleyescall);
                    }}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <TouchableOpacity style={[
                                tw(
                                    "absolute top-0 right-0 "
                                )

                            ]}>

                                <AntDesign name="closecircle" size={40} color="black"
                                    onPress={() => setModalVisibleyescall(!modalVisibleyescall)}
                                />

                            </TouchableOpacity>
                            <Text style={styles.modalText}>The number is in the Profile   </Text>
                            <View style={tw("p-1")} />
                            <Text style={styles.modalTextupgrade}> You are a Premium Member ☑️ </Text>

                            <Text style={styles.modalTexts}>Note : Please Call only if you now the person and dont spam the number .
                            </Text>
                            <Text style={styles.modalTexts}>
                                Strict Actions will be taken by the constitution goverment if done wrong</Text>
                            <View style={tw("p-3")}></View>



                        </View>
                    </View>
                </Modal>
                <View style={tw("p-1")} />
                {userstatepro ?
                    <TouchableOpacity
                        onPress={() => swipeRef.current.swipeRight()}
                        style={[tw(
                            "items-center justify-center rounded-full w-16 h-16 "
                        ), styles.shadow]}
                    >
                        <Image source={messages} />
                    </TouchableOpacity>
                    :

                    <TouchableOpacity
                        onPress={() => setModalVisiblenomessage(!modalVisiblenomessage)}
                        style={[tw(
                            "items-center justify-center rounded-full w-16 h-16 "
                        ), styles.shadow]}
                    >
                        <Image source={messages} />
                    </TouchableOpacity>

                }
                <View style={tw("p-1")} />
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={[tw(
                        "items-center justify-center rounded-full w-16 h-16 "
                    )
                    ]}
                >
                    <Image source={like} />

                </TouchableOpacity>
                <View style={tw("p-1")} />
                {userstatepro ?
                    <TouchableOpacity
                        onPress={() => setModalVisibleyescall(!modalVisibleyescall)}
                        style={tw(
                            "items-center justify-center rounded-full w-16 h-16 "
                        )}
                    >
                        <Image source={calling} />

                    </TouchableOpacity>
                    : <TouchableOpacity
                        onPress={() => setModalVisiblenocall(!modalVisiblenocall)}
                        style={[tw(
                            "items-center justify-center rounded-full w-16 h-16 "
                        ), styles.shadow]}
                    >
                        <Image source={calling} />

                    </TouchableOpacity>
                }
                <View>




                </View>

            </View>
            <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={tw(
                    " items-center "
                )}
            >
                <Text
                    style={tw(" text-lg text-yellow-500 ")}

                >Hide & Report</Text>
            </TouchableOpacity>


        </SafeAreaView >



    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {

        resizeMode: 'cover',
        justifyContent: 'center',
    },
    titleimage: {

        resizeMode: 'cover',
        justifyContent: 'center',
        width: 150,
        height: 60,
    },
    gobacimage: {

        resizeMode: 'cover',
        justifyContent: 'center',
        width: 155,
        height: 55,
    },

    titlenumber: {

        resizeMode: 'cover',
        justifyContent: 'center',
        width: 300,
        height: 55,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        height: 555,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    PremiumView: {
        margin: 30,
        backgroundColor: "white",

        borderRadius: 20,
        padding: 20,
        height: 655,
        width: 350,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    premiumimg: {

        resizeMode: 'cover',
        justifyContent: 'center',
        width: 340,
        height: 620,

    },
    button: {
        borderRadius: 20,
        padding: 15,
        height: 50,
        width: 200,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",


    },
    textStylenum: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",


    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    modalTextupgrade: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: "red",
    },
    modalTexts: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 15,

    }


});