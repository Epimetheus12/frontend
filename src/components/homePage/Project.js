import React, {Component, Fragment, lazy, Suspense} from "react";
import {fetchAllProjectAction, fetchResourceAction} from "../../store/actions";
import {connect} from "react-redux";
import {Dropdown} from 'rsuite'
import {toast} from "react-toastify";
import {ToastComponent} from "../common";
// import Resource from './Resource';
import { CircleLoader } from 'react-spinners'
import { css } from '@emotion/react';
import 'rsuite/dist/rsuite.css';
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import SelectResource from './SelectResource';
import EditColumn from './EditColumn';
import EditResource from "./EditResource";

const Resource = lazy(() => import('./Resource'));
const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;`;

class Project extends Component{

    constructor(props) {
        super(props);

        this.state= {
            projectId: '',
            projectName: '',
            projectArr: [],
            selectArr:[],
            selectColumnArr:[],
            ready:false,
            selectStatus: true,
            editStatus: false,
            editResource: false,
            url:''
            // resourceArr: []
        }

        this.getAllProjects = this.getAllProjects.bind(this)
        this.onSelectRow = this.onSelectRow.bind(this)
        this.onSubmitColumn = this.onSubmitColumn.bind(this)
        this.onHandleBack = this.onHandleBack.bind(this)
        // this.onSelectMenu = this.onSelectMenu.bind(this)
    }

    componentDidMount() {
        // console.log("project")
        console.log(this.props.match.url);
        this.getAllProjects();
        // this.setState({
        //     projectId: this.props.projectArr[0].id,
        //     projectName: this.props.projectArr[0].name,
        //     projectArr: this.props.projectArr
        // })
        this.setState({ready:true, url: this.props.match.url})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loadResourceError != null && prevProps.loadResourceError !== this.props.loadResourceError) {
            toast.error(<ToastComponent.errorToast text={`${this.props.loadResourceError}`} />, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        // }else if(this.state.projectId !== null && this.state.projectId !== prevState.projectId && !this.props.loading){
        //     this.setState({projectId: this.state.projectId})
        // }

        if(this.state.projectArr.length === 0 && this.props.loadProjectError == null && !this.props.loading && this.props.loadProjectSuccess && this.state.ready) {
            this.setState({
                projectId: this.props.projectArr[0].id,
                projectName: this.props.projectArr[0].name,
                projectArr: this.props.projectArr
            })
        }

        if(this.state.selectStatus && this.state.selectArr.length !== 0 && this.state.selectArr !== prevState.selectArr){
            this.setState({selectStatus: false, editStatus: true});
            // console.log(this.state)
        }

        if(this.state.editStatus && this.state.selectArr.length !== 0 && this.state.selectColumnArr.length !==0 && this.state.selectColumnArr !== prevState.selectColumnArr){
            this.setState({editStatus: false, editResource: true});
            // console.log(this.state.selectColumnArr)
        }


        if(this.props.match.url !== prevProps.match.url){
            this.setState({ready:true, url: this.props.match.url})
        }
    }

    getAllProjects() {
        this.props.getAllProjects();
    }

    onSelectMenu(eventKey){
        this.setState({
            projectId: eventKey.id,
            projectName: eventKey.name
        })
    }

    formatData = () =>{
        let data = [];
        let resourceData = this.state.resourceArr;
        for(let i =0; i < resourceData.length; i++){
                data.push({
                    key: resourceData[i].id,
                    name: resourceData[i].name,
                    resourceCode: resourceData[i].resourceCode
                });
        }
        return data
    }

    onSelectRow(data){
        if(data === undefined || data === null) data = [];
        this.setState({selectArr:data})
    }

    onSubmitColumn(data){
        if(data === undefined || data === null) data = [];
        this.setState({selectColumnArr:data})
    }

    onHandleBack(field1, field2){
        this.setState({[field1]: true, [field2]: false});
    }


    render() {

        // const projectData = {id: this.state.projectId, name: this.state.projectName};
        // console.log(projectData)
        // const projectArr = this.props.projectArr;
        const {url, projectId, projectName, projectArr, selectArr, selectColumnArr, selectStatus, editStatus, editResource} = this.state


        return(

            <Fragment>
                <Suspense fallback={
                    <div className='sweet-loading'>
                        <CircleLoader
                            css={override}
                            sizeUnit={"px"}
                            size={150}
                            color={'#61dafb'}
                            loading={true}
                        />
                    </div>}>
                    <Dropdown title={projectName} style={{marginLeft: "1200px", marginTop: "20px", marginBottom:"10px"}}>
                        {projectArr.map((project)=>{
                            return <Dropdown.Item eventKey={{id:project.id, name:project.name}} onSelect={(eventKey) => this.onSelectMenu(eventKey)}>{project.name}</Dropdown.Item>
                        })}
                    </Dropdown>
                    {url === '/project' &&<Resource
                        projectId={projectId}
                        projectName={projectName}
                    >
                    </Resource>}
                    {url === '/project/select' && selectStatus &&<SelectResource
                        resourceData={this.formatData}
                        projectId={projectId}
                        projectName={projectName}
                        onSelectRow={this.onSelectRow}
                        onBack = {this.onHandleBack}
                    >
                    </SelectResource>}

                    {url === '/project/select' && editStatus && <EditColumn
                        onSubmitColumn={this.onSubmitColumn}
                        onBack = {this.onHandleBack}
                    />}

                    {url === '/project/select' && editResource && <EditResource
                        selectArr = {selectArr}
                        selectColumnArr = {selectColumnArr}
                        onBack = {this.onHandleBack}
                    />}

                </Suspense>
            </Fragment>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        loadProjectSuccess: state.project.success,
        loadProjectError: state.project.error,
        projectArr: state.project.projectData,
        // loadResourceSuccess: state.resource.success,
        // loadResourceError: state.resource.error,
        // resourceArr: state.resource.resourceData,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllProjects: () => dispatch(fetchAllProjectAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Project);