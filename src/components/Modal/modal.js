import React from "react";


export default function Modal(props) {
    const {query, showModal, setShowModal} = props;
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-500 outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-6xl">
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        SPARQL QUERY USED:
                                    </h3>

                                </div>
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-gray-600 text-lg leading-relaxed">
                                        {query.split("\n").map((i, key) => {
                                            return <div>
                                                {i}
                                            </div>
                                        })}

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-400 bg-black"></div>
                </>
            ) : null}
        </>
    );
}