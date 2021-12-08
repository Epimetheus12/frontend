import React, {Component, Fragment} from "react";
import {fetchResourceAction, addResourceAction} from "../../store/actions";
import {connect} from "react-redux";
import "./css/Resource.css";

class Resource extends Component{

    constructor(props) {
        super(props);

        this.state = {
            resourceCode:'',
            resourceName:'',
            editableRow:"",
            resourceArr:[],
            rowArr:[],
            addResource:false
        }
        this.getResources = this.getResources.bind(this)
        this.onShowAdd = this.onShowAdd.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.addResource = this.addResource.bind(this)
    }

    componentDidMount() {
        // console.log("resource")
        this.getResources(this.props.projectId);
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
        if(this.state.resourceCode.length !== 0 && this.state.resourceName.length !== 0 && this.props.addSuccess){
            this.getResources(this.props.projectId)
            // if(this.props.loadResourceError == null && !this.props.loading && this.props.loadResourceSuccess){
            //     this.setState({resourceArr: this.props.resourceArr});
            // }
        }
    }

    getResources(projectId){
        this.props.getResources(projectId);
    }

    addResource(projectId,resourceName, resourceCode){
        this.props.addResource(projectId, resourceName, resourceCode);
    }

    onShowAdd(event){
        // event.preventDefault();
        this.setState({
            resourceCode:'',
            resourceName:'',
            addResource: !this.state.addResource})
    }

    onSubmitHandler(event){
        event.preventDefault();
        if (this.canBeSubmitted()) {
            console.log("submit")
            return;
        }

        const {resourceCode, resourceName} = this.state
        this.props.addResource(this.props.projectId, resourceName, resourceCode);
        this.getResources(this.props.projectId);
        this.setState({
            resourceCode: '',
            resourceName: ''
        });
        this.onShowAdd();
    }

    canBeSubmitted() {
        const {resourceCode, resourceName} = this.state
        const errors = this.validate(resourceCode, resourceName);
        const isDisabled = !Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    onChangeHandler(event) {
        // console.log(event.target)
        // event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
        // console.log(this.state)
    }

    validate = (resourceCode, resourceName) => {
        return {
            resourceCode: resourceCode.length === 0,
            resourceName: resourceName.length === 0
        }
    }

//    handleBlur(event) {
//         event.preventDefault();
// }

    onChangeRow = () => {

    }

    render() {

        const {resourceCode, resourceName} = this.state
        const errors = this.validate(resourceCode, resourceName);
        const isDisabled = !Object.keys(errors).some(x => errors[x])
        const show = this.state.addResource;
        const resourceArr = this.props.resourceArr;

        return(
            <Fragment>
                <div className="table-container">
                    <table className="resourceTable" cellSpacing="0" cellPadding="1" border="1" width="600">
                            <thead>
                            <tr style={{"color":"white","background-color":"grey"}}>
                                <th colSpan="2">{this.props.projectName}</th>
                            </tr>
                            </thead>
                            <thead>
                            <tr style={{"color":"white", "background-color":"grey"}}>
                                <th>Resource Code</th>
                                <th>Resource Name</th>
                            </tr>
                            </thead>
                            <tbody >
                            {

                                resourceArr.map((resource) =>{
                                    return(
                                        <tr key ={resource.id}>
                                            <td className="resourceTd">{resource.name}</td>
                                            <td className="resourceTd">{resource.resourceCode}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                    </table>
                    <button type='primary' onClick={this.onShowAdd}>{this.state.addResource ?'Discard':'Add Resource'}</button>
                    {show && <form onSubmit={event => this.onSubmitHandler(event)}>
                        <label htmlFor="resourceCode">Resource Code: </label>
                        <input id="resourceCode" name="resourceCode"
                               onChange={this.onChangeHandler}
                               value={this.state.resourceCode}/>
                        <label htmlFor="resourceName">Resource Name: </label>
                        <input id="resourceName" name="resourceName"
                               onChange={this.onChangeHandler}
                               value={this.state.resourceName}/>
                        <button type="submit" disabled={!isDisabled}>ADD</button>
                    </form>}
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
        addSuccess: state.addResource.success,
        addError: state.addResource.error,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getResources: (projectId) => dispatch(fetchResourceAction(projectId)),
        addResource: (projectId, name, code) => dispatch(addResourceAction(projectId, name, code))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resource);