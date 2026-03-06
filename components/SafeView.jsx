// // SafeView.js
// import React from "react";
// import { View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { styled } from "nativewind";

// const StyledView = styled(View);

// const SafeView = ({ children, className = "", style = {} }) => {
//   const insets = useSafeAreaInsets();

//   return (
//     <StyledView
//       className={`flex-1 ${className}`}
//       style={{
//         paddingTop: insets.top,
//         paddingBottom: insets.bottom,
//         paddingLeft: insets.left,
//         paddingRight: insets.right,
//         ...style,
//       }}
//     >
//       {children}
//     </StyledView>
//   );
// };

// export default SafeView;


// SafeView.js
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeView = ({ children, className = "", style = {} }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={className}
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default SafeView;
