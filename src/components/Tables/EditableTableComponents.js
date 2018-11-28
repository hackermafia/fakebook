import React from 'react';
import { Input, Form } from 'antd';
const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
    state = { editing: false };
    componentDidMount() {
        (this.props.editable) ? (document.addEventListener('click', this.handleClickOutside, true)) : void (0)
    };
    componentWillUnmount() {
        (this.props.editable) ? (document.removeEventListener('click', this.handleClickOutside, true)) : void (0);
    };
    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => (editing) ? (this.input.focus()) : void (0));
    };
    handleClickOutside = (e) => {
        const { editing } = this.state;
        (editing && this.cell !== e.target && !this.cell.contains(e.target)) ? (this.save()) : void (0);
    };
    save = () => {
        const { record, saveData } = this.props;
        this.form.validateFields((error, values) => {
            if (error) { return };
            this.toggleEdit();
            saveData({ ...record, ...values });
        });
    }
    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            saveData,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                        <div
                                            className="editable-cell-value-wrap"
                                            style={{ paddingRight: 24 }}
                                            onClick={this.toggleEdit}
                                        >
                                            {restProps.children}
                                        </div>
                                    )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    };
};
const components = {
    row: EditableFormRow,
    cell: EditableCell
};
export default components;