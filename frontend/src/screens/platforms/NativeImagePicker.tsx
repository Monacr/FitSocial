import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    launchCamera(options: Object, callback: (result) => void): void;

    launchImageLibrary(options: Object, callback: (result) => void): void;
}
// @ts-ignore
export default TurboModuleRegistry.get<Spec>(
    'ImagePicker'
);