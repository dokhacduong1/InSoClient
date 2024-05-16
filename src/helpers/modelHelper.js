


//Function handleShowModal
export const handleShowModal = (form = "", setIsModalOpen) => {
    if (form !== "") {
        form.resetFields();
    }
    setIsModalOpen(true);
};

//Function handleCancel
export const handleCancel = (form = "", setIsModalOpen) => {
    if (form !== "") {
        form.resetFields();
    }
    setIsModalOpen(false);

};



//Function handleCancel
export const handleUpdateDataPermission = (form, setIsModalOpen, record) => {

    //Lấy giá trị măc định cho form
    const defaultValue = {
        title: record.title,
        description: record.description,
    }
    if (form !== "") {
        form.resetFields();
        form.setFieldsValue(defaultValue)
    }
    //Mở modal
    setIsModalOpen(true);
};


//Function
export const handleUpdateDataInfo = (form, setIsModalOpen, record) => {
    //tạo một object rỗng để lưu giá trị của form
    const defaultValue = {
        homeowners: record.homeowners,
        age: record.age,
        wife_homeowners: record.wife_homeowners,
        wife_age: record.wife_age,
        address: record.address,
        info_children: record.info_children,

    };


    //nếu form khác rỗng thì set giá trị cho form
    if (form !== "") {
        form.resetFields();
        form.setFieldsValue(defaultValue)
    }
    //Mở modal
    setIsModalOpen(true);
};

export const handleUpdateSheet = (form, setIsModalOpen, record) => {
    //tạo một object rỗng để lưu giá trị của form
    const defaultValue = {
       title: record.title,
       positionAddress: record.positionAddress,
       positionUserInfo: record.positionUserInfo,
    };


    //nếu form khác rỗng thì set giá trị cho form
    if (form !== "") {
        form.resetFields();
        form.setFieldsValue(defaultValue)
    }
    //Mở modal
    setIsModalOpen(true);
};


