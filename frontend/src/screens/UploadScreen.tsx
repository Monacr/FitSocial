import {Platform} from 'react-native';

import {CameraOptions, ImageLibraryOptions, Callback} from './types';
import {
    imageLibrary as nativeImageLibrary,
    camera as nativeCamera,
} from "./platforms/native";
import {
    imageLibrary as webImageLibrary,
    camera as webCamera,
} from './platforms/web';

export * from './types';

export function launchCamera(options: CameraOptions, callback?: Callback) {
    return Platform.OS === 'web'
        ? webCamera(options, callback)
        : nativeCamera(options, callback);
}

export function launchImageLibrary(
    options: ImageLibraryOptions,
    callback?: Callback,
) {
    return Platform.OS === 'web'
        ? webImageLibrary(options, callback)
        : nativeImageLibrary(options, callback);
}

// import React, {useState, useContext} from 'react';
// import ImageUploading, { ImageListType } from "react-images-uploading";
// import {
//     View,
//     Text,
//     Platform,
//     StyleSheet,
//     Alert,
//     ActivityIndicator,
//     Button,
//     TouchableOpacity
//
// } from 'react-native';
// import type {PropsWithChildren} from 'react';
//
// const UploadScreen = ({navigation}) => {
//     // return(
//     //
//     //     <View style={styles.container}>
//     //         <Text>Upload Screen</Text>
//     //         <Button onPress={() => navigation.navigate("Upload Image")} title="Upload Image"  />
//     //         <Button onPress={() => navigation.navigate("Take Photo")} title="Take Photo"  />
//     //     </View>
//     // );
//     const [images, setImages] = React.useState([]);
//     const maxNumber = 69;
//
//     const onChange = (
//         imageList: ImageListType,
//         addUpdateIndex: number[] | undefined
//     ) => {
//         // data for submit
//         console.log(imageList, addUpdateIndex);
//         setImages(imageList as never[]);
//     };
//     const [flexDirection, setflexDirection] = useState('none');
//     return (
//         <ImageLayout
//             values={['Upload Image', 'Take Photo']}
//             selectedValue={flexDirection}
//             setSelectedValue={setflexDirection}>
//         </ImageLayout>
//         // <ImageUploading
//         //     multiple
//         //     value={images}
//         //     onChange={onChange}
//         //     maxNumber={maxNumber}
//         // >
//         //     {({
//         //         imageList,
//         //         onImageUpload,
//         //         isDragging,
//         //
//         //     })}
//         // </ImageUploading>
//     );
//
// };
//
// type ImageLayoutProps = PropsWithChildren<{
//     values: string[];
//     selectedValue: string;
//     setSelectedValue: (value: string) => void;
// }>;
//
// const ImageLayout = ({
//                            values,
//                            selectedValue,
//                            setSelectedValue,
//                        }: ImageLayoutProps) => (
//     <View style={{padding: 10, flex: 1}}>
//         <View style={styles.row}>
//             {values.map(value => (
//                 <TouchableOpacity
//                     key={value}
//                     onPress={() => setSelectedValue(value)}
//                     style={[styles.button, selectedValue === value && styles.selected]}>
//                     <Text
//                         style={[
//                             styles.buttonLabel,
//                             selectedValue === value && styles.selectedLabel,
//                         ]}>
//                         {value}
//                     </Text>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     </View>
// );
//
// const styles = StyleSheet.create({
//
//     row: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     button: {
//         paddingHorizontal: 8,
//         paddingVertical: 6,
//         borderRadius: 6,
//         backgroundColor: 'white',
//         alignSelf: 'flex-start',
//         marginHorizontal: '1%',
//         marginBottom: 6,
//         minWidth: '48%',
//     },
//     selected: {
//         backgroundColor: 'dodgerblue',
//         borderWidth: 0,
//     },
//     buttonLabel: {
//         fontSize: 20,
//         fontWeight: '500',
//         color: 'black',
//         textAlign: 'center',
//     },
//     selectedLabel: {
//         color: 'white',
//     },
// });
//
// export default UploadScreen;
