/* eslint-disable react/prop-types */
import PackageTrackingForm from "./PackageTrackingForm";


const Package = ({pack}) => {
    return (
        <div>
            <PackageTrackingForm pack={pack}/>
        </div>
    );
};

export default Package;