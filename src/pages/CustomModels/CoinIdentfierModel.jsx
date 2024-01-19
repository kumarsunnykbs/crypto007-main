import React from 'react'
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"

import { ToastContainer, toast } from 'react-toastify';
import { APIURL } from '../../Utilitiess/Const';

function CoinIdentfierModel(props) {

    // console.log("propsid", props)

    const DeleteApi = () => {
        // console.log("idddddddd", id)
        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: {
                'Authorization': token
            }
        };
        // fetch(`http://18.169.95.14:3000/user/${authId.uid}/identifier/${props.storeDeleteid}`, requestOptions)
        fetch(`${APIURL}/user/${authId.uid}/identifier/${props.storeDeleteid}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log("result", result);
                if (result.error) {
                    toast.error(result.msg)
                    props.getCoinHandler();
                    return
                }
                toast.success(result.msg)
                props.getCoinHandler();
                // setRestorebalanceData(result.body.USDT.total)
            })
            .catch(error => console.log('error', error));
        props.setModal(false)
    }
    // console.log("deleteCoinIdentifers", deleteCoinIdentifers)
    return (
        <Modal isOpen={true} toggle={() => {
            props.setModal(false)
        }} className="align-items-center">
            <ModalHeader
                toggle={() => {
                    props.setModal(false)
                }}>Delete Coin Identifer</ModalHeader>
            <ModalBody>
                Are you sure you want to delete this record !
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={DeleteApi} >Delete</Button>

            </ModalFooter>
            <ToastContainer />
        </Modal>

    );
}

export default CoinIdentfierModel;