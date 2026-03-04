import styles from './Select.module.css'

function Select({ setter, data, valueKey, labelKey, defaultText }) {
  return (
    <select className={styles.select} onChange={(e) => setter(e.target.value)}>
      <option value="">-- {defaultText} --</option>

      {data.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}

export default Select;
