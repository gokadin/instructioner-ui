import {SubjectEntity} from "../../models/subject.entity";

export interface AdminState {
    subjectIds: string[]
    subjects: Record<string, SubjectEntity>
    selectedSubjectId: string
}

export const initialState: AdminState = {
    subjectIds: [],
    subjects: {},
    selectedSubjectId: ''
}
