// On renomme 'function' en 'setter' et on utilise les crochets []
function Select({ setter, data, valueKey, labelKey, defaultText }) {
  return (
    <select onChange={(e) => setter(e.target.value)}>
      {/* Correction de la valeur par défaut */}
      <option value="">-- {defaultText} --</option>

      {/* Correction de la boucle map */}
      {data.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}
export default Select;
