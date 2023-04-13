export function capitalise(input){
    return input.slice(0, 1).toUpperCase() + input.slice(1)
}


export function formDataToQuery(formData){
    return {
        town: formData.town,
        min_price: formData.priceRange[0],
        max_price: formData.priceRange[1],
        amenities: formData.nearbyAmenities.toString().toLowerCase(),
        flat_types: formData.flatTypes.toString().toLowerCase(),
        hdb_type: formData.HDBType,
        application_rate: formData.applicationRate,
        remaining_lease: formData.remaining_lease
    }
}
// export default { capitalise, formDataToQuery }