

const DemoPackage = () => {
    return (
        <div>
            <form className="border p-4">
                {/* Main div */}
                <div>
                    {/* 1st part */}
                    <div className="md:flex gap-5">
                        <div className="space-y-2 h-[200px] flex-1 p-4 border-2 ">
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" placeholder="Daisy" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="text" className="grow" placeholder="daisy@site.com" />
                            </label>
                        </div>
                        <div className="space-y-2 flex-1 p-4 border-2 ">
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" placeholder="Daisy" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="text" className="grow" placeholder="daisy@site.com" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" placeholder="Daisy" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="text" className="grow" placeholder="daisy@site.com" />
                            </label>
                        </div>
                    </div>


                    <div className="w-[50%] -mt-10">
                        <p className="text-xl font-semibold">Sender Information: </p>
                        <div className="space-y-2 flex-1 p-4 border-2 ">
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" placeholder="Daisy" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="text" className="grow" placeholder="daisy@site.com" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" className="grow" placeholder="Daisy" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Email
                                <input type="text" className="grow" placeholder="daisy@site.com" />
                            </label>
                        </div>
                    </div>


                </div>


            </form>
        </div>
    );
};

export default DemoPackage;