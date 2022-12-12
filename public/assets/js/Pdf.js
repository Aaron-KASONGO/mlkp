
function App(props) {
    var opt = {
        filename:     'mulykap.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

    const createDoc = () => {
        var element = document.getElementById('content');
        html2pdf(element);
    }

    React.useEffect(() => {
        createDoc();
    })

    return (
        <div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);