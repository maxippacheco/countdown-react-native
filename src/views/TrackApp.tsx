import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { TextInput } from 'react-native';
// import { Vibration } from 'react-native';
import { Text, View, TouchableOpacity, Animated, useWindowDimensions, StyleSheet } from 'react-native';
import { styles } from '../themes/appTheme';


export const TrackApp = () => {
	

	const data = [...Array(19).keys()].map((i) => (i === 0 ? 1 : i * 5));
	// const data_keys = data.keys;
	const [duration, setDuration] = useState(data[0]);
	const inputRef = useRef<any>(null);

	const {width, height} = useWindowDimensions();

	const ITEMS_SIZE = width * 0.38;
	const ITEMS_SPACING = (width - ITEMS_SIZE) / 2;


	const scrollX = useRef(new Animated.Value(0)).current;
	
	const timerAnimation = useRef(new Animated.Value(height)).current;
	const buttonAnimation = useRef(new Animated.Value(0)).current;
	const textInputAnimation = useRef(new Animated.Value(data[0])).current;

	
	useEffect(() => {
		
		const listener = textInputAnimation.addListener(({value}) => {
			inputRef?.current?.setNativeProps({
				text: Math.ceil(value).toString()
			})
		})

		return () => {
			textInputAnimation.removeListener(listener);
			textInputAnimation.removeAllListeners();
			
		}
	}, [])


	const animation = useCallback(() => {
	
		textInputAnimation.setValue(duration);

		Animated.sequence([


			//Lo mandamos abajo
			Animated.timing(buttonAnimation, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true
			}),
			//Lo mandamos para abajo
			Animated.timing(timerAnimation, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true
			}),
			
			//Lo mandamos para arriba
			// Animated.timing(timerAnimation, {
			// 	toValue: height,
			// 	duration: duration * 3000,
			// 	useNativeDriver: true
			// })
			Animated.parallel([
				Animated.timing(timerAnimation, {
					toValue: height,
					duration: duration * 1000,
					useNativeDriver: true
				}),

				Animated.timing(textInputAnimation, {
					toValue: 0,
					duration: duration * 1000,
					useNativeDriver: true
				}),

				Animated.delay(400)

			])

		]).start(() => {
			//Para que vuelva hacia arriba
			textInputAnimation.setValue(duration);
			// Vibration.cancel();
			// Vibration.vibrate();
			Animated.timing(buttonAnimation, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true
			}).start()	
		
		})


	
	},[duration])

	const opacity = buttonAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [ 1, 0]
	})

	const translateY =  buttonAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [ 0, 2000]
	})

	return (
		<View style={styles.box1}>
			<View style={styles.textTimerBox}>

				<Animated.View style={[StyleSheet.absoluteFillObject, {
					height,
					width,
					backgroundColor: '#3f888f',
					transform:[{
						translateY: timerAnimation
					}]
				}]}>				
				</Animated.View>

				<Animated.View style={{
					...styles.durationContainer
				
				}}>
					<TextInput 
						ref={inputRef}
						style={styles.durationText}
						defaultValue={duration.toString()}
					/>
				</Animated.View>

				<Animated.FlatList
					data={data}
					horizontal
					bounces={false}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item:any) => item.toString()}
					//Retornas lo que vayas a renderizar
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset: {x: scrollX}}}]
						// {useNativeDriver: true}
					)}
					contentContainerStyle={{paddingHorizontal: ITEMS_SPACING}}
					renderItem={({item, index}) => {
						
						const inputRange = [
						
							(index -1) * ITEMS_SIZE, 
						
							index * ITEMS_SIZE, 
						
							(index + 1) * ITEMS_SIZE
						]

						const opacity = scrollX.interpolate({
							inputRange,
							outputRange: [.5, 1, .5]
						})

						const scale = scrollX.interpolate({
							inputRange,
							outputRange: [.7, 1.5, .7]
						})
						
						return (
							<View style={{...styles.timerDataBox, width: ITEMS_SIZE, alignItems: 'center', justifyContent:'flex-end'}}>
								<Animated.Text style={{...styles.timerDataText, opacity, transform:[{scale}] }}>
									{item}
								</Animated.Text>
							</View>
						)
					}}
					decelerationRate='fast'
					snapToInterval={ITEMS_SIZE}
					onMomentumScrollEnd={ev => {
						const index = Math.round(ev.nativeEvent.  contentOffset.x / ITEMS_SIZE);

						setDuration(data[index]);
					}}
					style={{opacity}}
				>


				</Animated.FlatList>
			</View>

			<View style={styles.box2Container}>
				<Animated.View style={[StyleSheet.absoluteFillObject, {
					opacity,
					transform:[{translateY}],
					...styles.box2
				}]}>

					
						<Animated.View 	style={{...styles.goButton}}>
							<TouchableOpacity
								onPress={animation}
							><Text style={styles.textGoButton}>GO!</Text></TouchableOpacity>
						</Animated.View>
				</Animated.View>

			</View>
		</View>
	);
}