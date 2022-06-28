import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  marginXS,
  textMedium,
} from '../themes/theme';

type TProps = {
  label: string
  value: string | number | null
  unit?: string
  children?: never
}

export const DisplayDataRow: React.FC<TProps> = ({ label, unit, value }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
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
    marginBottom: marginXS,
    justifyContent: "space-between",
  },
  label: {
    fontSize: textMedium,
    fontWeight: "bold",
  },
  valueWithUnit: {
    flexDirection: "row",
  },
  value: {
    fontSize: textMedium,
  },
  unit: {
    fontSize: textMedium,
    marginLeft: marginXS,
  },
})
