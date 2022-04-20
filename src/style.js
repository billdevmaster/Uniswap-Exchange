import Styled from 'styled-components';

const StyleWrapper = Styled.div`
    .white {
        background-color: white
    }

    .black {
        background-color: #4d4d4d
    }

    .btn-group {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        padding-top: 30px;
    }

    .toggle-btn {
        margin-right: 10%;
        margin-left: 20px;
    }

    .table-wrapper {
        min-height: 800px;
        padding: 20px 10%;
    }
`;

export {
    StyleWrapper,
}