import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  spacingXS,
  textMedium,
  textSmall,
} from '../themes/theme';

type TProps = {
  label: string | React.ReactNode
  value: string | number | null
  unit?: string
  children?: never
}

export const DisplayDataRow: React.FC<TProps> = ({ label, unit, value }) => {
  return (
    <View style={styles.row}>
      {typeof label === "string" ? <Text style={styles.label}>{label}:</Text> : label}
      <View style={styles.valueWithUnit}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: spacingXS,
    justifyContent: "space-between",
  },
  label: {
    fontSize: textMedium,
    fontWeight: "bold",
  },
  valueWithUnit: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: textMedium,
  },
  unit: {
    fontSize: textSmall,
    marginLeft: spacingXS,
  },
})
