
import { useQuery } from "@tanstack/react-query";
import { getBranch } from "../../../../api/auth";


const Coverage = () => {
    const {
        data: branches = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["branches"],
        queryFn: async () => await getBranch(),
    });

    if (isLoading) return <p>Loading branches...</p>;
    if (error) return <p>Error fetching branches: {error.message}</p>;

    return (
        <div>
            <div>
                <div
                    className="hero bg-secondary mb-5 min-h-[50vh]"
                    style={{
                        backgroundImage: "url(https://transp-nextjs.vercel.app/_next/static/media/banner.416d8a43.png)",
                    }}>

                    <div className="hero-content font-rancho text-center">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl text-primary font-bold">Our Coverage Area</h1>

                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-8 ml-4 mr-4">
                {branches.map((branch) => (
                    <div
                        key={branch?.id || branch?.Branch_Number}
                        className="bg-slate-400 rounded-lg shadow-md flex flex-col justify-between"
                    >

                        {/* <div className="p-4 text-center bg-opacity-90 rounded-md bg-cover bg-center h-40 w-full"
                            style={{
                                backgroundImage: "url(http://localhost:5173/src/assets/nexp-update.png)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}>

                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                {branch?.Branch_Name}
                            </h2>
                            <p className="text-gray-600">
                                <strong>Number:</strong> {branch?.Branch_Number}
                            </p>
                            <p className="text-gray-600">
                                <strong>Commission:</strong> {branch?.Branch_Commission}
                            </p>
                            <p className="text-gray-600">
                                <strong>Type:</strong> {branch?.Branch_type}
                            </p>
                        </div> */}
                        <div className="relative p-6 rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden">
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30"
                                style={{
                                    backgroundImage: "url('https://i.ibb.co.com/SD8pn0BD/text-logo.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>

                            {/* Overlay for Contrast */}
                            <div className="absolute inset-0 bg-slate-300 bg-opacity-65"></div>

                            {/* Content */}
                            <div className="relative z-10 text-blue-950 text-center">
                                <h2 className="text-xl font-bold mb-2">{branch?.Branch_Name ||"N/A"}</h2>

                                <p className="text-sm">
                                    <strong>Type:</strong> {branch?.Branch_type ||"N/A"}
                                </p>
                                <p className="text-sm">
                                    <strong>Support Company Name:</strong> {branch?.Branch_Support_Company || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Address:</strong> {branch?.Branch_Address ||"N/A"}
                                </p>
                                <p className="text-sm">
                                    <strong>Contact Number:</strong> {branch?.Branch_Number ||"N/A"}
                                </p>
                                <p className="text-sm">
                                    <strong>IP Number:</strong> {branch?.Branch_IP_Number || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Reference:</strong> {branch?.Reference || 'N/A'}
                                </p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Coverage;
