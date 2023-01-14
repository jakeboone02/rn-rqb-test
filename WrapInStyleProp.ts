import { StyleProp } from "react-native";

export type WrapInStyleProp<K> = { [P in keyof K]?: StyleProp<Required<K>[P]> };
