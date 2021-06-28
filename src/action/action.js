const addData = (data) => {
    return {
        type:"Add_data",
        payload:data
    }
};
export default addData;

export const showData = (data) => {
    return {
        type:"Show_data",
        payload:data
    }
}
export const addImage = (url) => {
    return {
        type:"Add_Image",
        payload:url
    }
}

// export default showData;