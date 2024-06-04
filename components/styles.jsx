import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#f51b',
    padding: 10,
    borderRadius: 3,
    margin: 10,
    marginVertical: 13,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 30,
    marginLeft: 10,
  },
  selectedImage: {
    width: 133,
    height: 133,
    margin: 2,
    zIndex: 992,
  },
  addView: {
    flexDirection: 'row',
  },
  addButtonDescr: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
    width: 240,
    marginTop: 2,
  },
  addButtonHr: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    width: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: 380,
    height: 380,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.1)",
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 8,
    zIndex: 999,
    backgroundColor: "#f51b",
    width: 390,
    height: 40,
    borderRadius:3,
    flexDirection: "row",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonsContainer: {
    marginTop: 100,
  },
  button: {
    backgroundColor: '#f51b',
    padding: 10,
    borderRadius: 2,
    margin: 5,
    width: 360,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 48,
    fontWeight: "bold",
  },
  button2: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 2,
    margin: 5,
    width: 360,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 48,
    fontWeight: "bold",
  },
  dateContainer: {
    marginTop: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
    margin: 10,
    fontWeight: "bold",
  },
  box: {
    width: 380,
    height: 180,
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.1)",
    margin: 11,
  },
  boxText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: "600"
  }, 
  noPicturesButton: {
    backgroundColor: '#f51b',
    padding: 10,
    borderRadius: 4,
    margin: 10,
    marginVertical: 13,
    width: 132,
    height: 132,
    alignItems: "center",
  },
  noPicturesButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 13,
  }, 
  addButton2: {
    width:50,
    height: 50,
  },
  deleteButton: {
    backgroundColor: '#f51b',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 2,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight:'bold',
  },
  deleteButton2: {
    backgroundColor: '#333',
    padding: 10,
    margin: 10,
    borderRadius: 2,
    alignItems: 'center',
  },
  deleteButtonText2: {
    color: 'white',
    fontWeight:'bold',
  },
  uriText: {
    color: "#fff",
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  info: {
    width: 374,
  }
});

export default styles;
