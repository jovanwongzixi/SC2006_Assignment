export default function FlatTitle({ title, town }) {
    return (
        <div className="flat-title">
            <h2>{title}</h2>
            <p>{town}</p>
            <style jsx>{`
                .flat-title {
                    margin-bottom: 10px;
                }
                h2 {
                    margin-top: 0px;
                }
            `}</style>
        </div>
    )
}