import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({

	box1:{
		flex: 1,
		backgroundColor: '#50c878',
		
	},
	box2Container:{
		flex: 1,
		justifyContent:'flex-end'

	},
	box2:{
		width: '100%',
		height: '70%',
		backgroundColor: 'whitesmoke',
		borderRadius: 180,
		borderBottomEndRadius: 0,
		borderBottomLeftRadius: 0,
		position:'relative',
		justifyContent:'center',
		alignItems:'center'
	},
	textTimerBox:{
		height: '45%',
		// justifyContent:'center',

	},
	timerDataBox:{
		justifyContent:'flex-end'
	},
	timerDataText:{
		fontSize:40,
		color: 'white',
		// paddingHorizontal: 40
	},
	durationContainer:{
		height: '80%',
		justifyContent: 'center'
	},
	durationText:{
		color: 'white',
		textAlign: 'center',
		fontSize: 80,
		// alignItems: 'center'
	},
	goButton:{
		// height: 30,
		width:'50%',
		marginBottom: 30,
		backgroundColor:'#50c878',
		padding:10,
		borderRadius:20
	},
	textGoButton:{
		fontSize:30,
		textAlign:'center',
		color:'white',
		// fontWeight:'bold'
	},


});