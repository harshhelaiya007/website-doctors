import React from 'react'
import Button from '../Button/Button'

function Model() {
    return (
        <div>
            <Button type="button" className="btn btn-primary modal-btn-click" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" hidden />
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crop Image</h1>
                            <Button  type="button" className="btn-close modal-close-btn" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <img src="" alt="doctors photos upload" className="photo-upload-img dsp-none" id="cropperjs" />
                        </div>
                        <div className="modal-footer">
                            <Button type="button" className="btn btn-secondary btn-color modal-close-btn"
                                data-bs-dismiss="modal" btnText={'Cancel'}/>
                            <Button type="button" className="btn btn-primary btn-color save-btn" btnText={'Save'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model