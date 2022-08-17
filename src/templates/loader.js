import React from 'react'
import { Spinner } from 'react-bootstrap'
import './home.css'

export default function loader() {
    return (
        <div className="spinner__loader">
            <Spinner animation="border" role="status" variant="info" >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}
