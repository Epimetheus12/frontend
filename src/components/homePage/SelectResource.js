import React, {Fragment, useState, useEffect, Component} from "react";
import 'antd/dist/antd.css';
import { Table, Button } from 'antd';
import {addResourceAction, fetchResourceAction} from "../../store/actions";
import {connect} from "react-redux";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Resource Code',
        dataIndex: 'resourceCode',
    }
];

class SelectResource extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeys: [],
            selectedRowKeys2:[],
            resourceArr:[]
        }
        this.getResources = this.getResources.bind(this)

        // this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    componentDidMount() {
        // console.log("resource")
        // this.getResources(this.props.projectId);
        // if(this.state.resourceArr.length === 0 && this.props.loadResourceError == null && !this.props.loading && this.props.loadResourceSuccess){
        //     this.setState({resourceArr: this.props.resourceArr})
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.projectId !== this.props.projectId){
            this.getResources(this.props.projectId)
            if(this.props.loadResourceError == null && !this.props.loading && this.props.loadResourceSuccess){
                this.setState({resourceArr: this.props.resourceArr});
            }
        }
    }

    getResources(projectId){
        this.props.getResources(projectId);
    }


    formatData = () =>{
        let data = [];
        let resourceData = this.props.resourceArr;
        for(let i =0; i < resourceData.length; i++){
            data.push({
                key: resourceData[i].id,
                name: resourceData[i].name,
                resourceCode: resourceData[i].resourceCode
            });
        }
        return data
    }

    selectData = (data) => {
        let temp = [];
        for(let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.state.selectedRowKeys.length; j++){
                if(data[i].key === this.state.selectedRowKeys[j]){
                    temp.push(data[i]);
                    break;
                }
            }
        }
        return temp
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    onSelectChange2 = selectedRowKeys2 => {
        this.setState({ selectedRowKeys2 });
    };

    onClickEvent(data){
        this.props.onSelectRow(data)
    }

    // onSelect1 = selectedRowKeys1 => {
    //     this.this.setState({selectedRowKeys2: selectedRowKeys1})
    // }

    render() {
        const {selectedRowKeys, selectedRowKeys2} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // const rowSelection2 = {
        //     selectedRowKeys2,
        //     onChange: this.onSelectChange2,
        // };

        const hasSelected = selectedRowKeys.length > 0;

        // const hasSelected2 = selectedRowKeys2.length > 0;

        const data = this.formatData();

        const selectData = this.selectData(data);

        return (
            <Fragment>
                <div style={{display: "inline-block", position:"relative", marginTop:"10px"}}>
                    <div>
                    <div style={{ marginBottom: 16, display:"inline-block", position:"relative", marginLeft:"300px"}}>
                        <Button type="primary" onClick={(event) => {this.onClickEvent(selectData)}} disabled={!hasSelected}>
                            Submit
                        </Button>
                    </div>
                    <div style={{ marginBottom: 16, display:"inline-block", position:"relative"}}>
                        <span style={{ marginLeft: 8}}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                    </div>
                    {/*<div style={{ marginBottom: 16, display:"inline-block", position:"fixed", marginLeft:"545px"}}>*/}
                    {/*    <Button type="primary" onClick={this.onSelect(selectedRowKeys)} disabled={!hasSelected}>*/}
                    {/*        Delete*/}
                    {/*    </Button>*/}
                    {/*    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>*/}
                    {/*</div>*/}
                    </div>
                    <div style={{display: "inline-block", marginLeft:"300px",position:"relative", width:"800px"}}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
                    </div>
                    {/*<div style={{display: "inline-block", marginLeft:"20px",marginBottom:"200px",position:"fixed", width:"600px"}}>*/}
                    {/*<Table rowSelection={rowSelection} columns={columns} dataSource={selectData}/>*/}
                    {/*</div>*/}
                </div>
            </Fragment>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        loadResourceSuccess: state.resource.success,
        loadResourceError: state.resource.error,
        resourceArr: state.resource.resourceData,
        loading: state.resource.loading,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getResources: (projectId) => dispatch(fetchResourceAction(projectId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectResource);