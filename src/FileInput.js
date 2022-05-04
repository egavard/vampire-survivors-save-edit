import React from "react";

class FileInputProps {
    onChange: (file: File) => {};
}

class FileInput extends React.Component<FileInputProps> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(file) {
        const reader = new FileReader();
        reader.onloadend = (e) => {
            this.props.onChange(reader.result);
        }
        reader.readAsText(file);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="saveFileInput">
                    Pick Vampire Survivors .sav file :
                    <input type="file" style={{width: "initial"}}
                           name="saveFile"
                           id="saveFileInput"
                           ref={this.fileInput}
                           onChange={e => this.handleSubmit(e.target.files[0])}/> </label>
                <br/>
            </form>
        );
    }
}

export default FileInput;