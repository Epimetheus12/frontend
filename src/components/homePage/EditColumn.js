import React, {Component} from "react";
import 'antd/dist/antd.css';
import { Table, Button, Popconfirm} from 'antd';
import {EditableCell, EditableRow} from './EditableField'

class EditColumn extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Column Name',
                dataIndex: 'columnName',
                width: '30%',
                editable: true
            },
            {
                title: 'Type',
                dataIndex: 'type',
                editable: true
            },
            {
                title: 'Formula',
                dataIndex: 'formula',
                editable: true
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            dataSource: [],
            count: 0,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            columnName: 'default',
            type: 'default',
            formula: 'default',
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    handleSubmit =(data) =>{
        this.props.onSubmitColumn(data);
    }

    handleBack = (field1, field2) =>{
        this.props.onBack(field1, field2)
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        const canBeSubmit = () => {
            for(let i = 0; i < dataSource.length; i++){
                if(dataSource[i].type === "default" || dataSource[i].columnName === "default" || dataSource[i].formula === "default"){
                    return false;
                }
            }
            return true;
        }

        return (
            <div style={{display: "inline-block", position:"relative", marginTop:"10px", marginLeft:300, width:800}}>
                <Button
                    onClick={(event => this.handleBack("selectStatus", "editStatus"))}
                    type="primary"
                >
                    Back
                </Button>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{ marginBottom: 16, marginLeft: 20}}
                >
                    Add a row
                </Button>
                <Button
                    onClick={(event => this.handleSubmit(dataSource))}
                    type="primary"
                    disabled={!(dataSource.length > 0) || !canBeSubmit()}
                    style={{ marginBottom: 16, marginLeft: 20}}
                >
                    Submit
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default EditColumn;