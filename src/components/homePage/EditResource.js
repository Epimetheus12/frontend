import React, {Component} from "react";
import 'antd/dist/antd.css';
import { Table, Button} from 'antd';
import {EditableCell, EditableRow} from './EditableField'
import {addColumnAndValueAction} from "../../store/actions/columnAction";
import {connect} from "react-redux";

class EditResource extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '30%'
            },
            {
                title: 'Resource Code',
                dataIndex: 'resourceCode',
            }
        ];
        this.state = {
            dataSource: [],
            format:true
        };
        // this.formatData = this.formatData.bind(this);
    }

    componentDidMount() {
        const {selectArr, selectColumnArr} = this.props;
        const data = this.formatData(selectArr, selectColumnArr)
        this.columns = this.formatColumn(selectColumnArr);
        this.setState({dataSource: data})
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.data.length !== prevProps.data.length && this.props.selectColumnArr.length !== prevProps.selectColumnArr){
        //     this.setState({datasource:this.props.data});
        //     console.log("===========")
        // }
        // if(this.state.format){
        //     this.setState({datasource:this.props.data, format: false});
        // }
        // console.log(1);
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        // console.log(newData);
        this.setState({
            dataSource: newData,
        });
    };

    handleSubmit =(data, column) =>{
        this.props.addColumnValue(data);
    }

    formatData = (data, column) => {
        let temp = [...data];
        for(let i = 0; i < column.length; i++){
            temp = data.map(e => {
                e[column[i].columnName] = "default";
                return e;
            });
        }
        return temp
    };

    formatColumn = (sauce) => {
        let columns = this.columns;
        for(let i = 0; i < sauce.length; i++ ){
            columns.push({
                title:sauce[i].columnName,
                dataIndex: sauce[i].columnName,
                editable:true
            });
        }
        // console.log(columns);
        return columns;
    }

    handleBack = (field1, field2) =>{
        this.props.onBack(field1, field2)
    }

    canBeSubmit = (column, dataSource) => {
        console.log(column);
        for(let i = 0; i < column.length; i++){
            for(let j = 0; j < dataSource.length; j++){
                if(dataSource[j][column[i].columnName] === "default"){
                    console.log(dataSource[j][column[i].columnName])
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        const { selectColumnArr} = this.props;

        const {dataSource} = this.state


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

        return (
            <div style={{display: "inline-block", position:"relative", marginTop:"10px", marginLeft:300, width:800}}>
                <Button
                    onClick={(event => this.handleBack("editStatus","editResource"))}
                    type="primary"
                >
                    Back
                </Button>
                <Button
                    onClick={(event) => this.handleSubmit(dataSource, selectColumnArr)}
                    type="primary"
                    disabled={false}
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

function mapStateToProps(state, ownProps) {
    return {
        addColumnSuccess: state.addColumnValue.success,
        addColumnError: state.addColumnValue.error
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addColumnValue: (projectId, name, formula, type, rid) => dispatch(addColumnAndValueAction(projectId, name, formula, type, rid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditResource);