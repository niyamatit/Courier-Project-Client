const Section = ({ title, children, additionalClasses = "" }) => (
    <div className={`p-3 bg-slate-50 rounded-lg ${additionalClasses}`}>
        {title && <h2 className="text-xl font-bold mb-4 text-blue-900">{title}</h2>}
        <div className="border rounded-lg p-4 shadow-sm">
            {children}
        </div>
    </div>
);

export default Section;
