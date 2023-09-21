import { Project } from "../models/Project"
import { Resource } from "../models/Resource"
import { Task } from "../models/Task"

export const tasks: Task[] = [
    {
        id: 1,
        title: "task1",
        startDate: 1693602000000,
        endDate: 1693861200000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9s1",
        parentId: null
    },
    {
        id: 2,
        title: "task2",
        startDate: 1693602000000,
        endDate: 1693861200000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d9c6",
        projectUid: "2bd34e3e-55da-4392-9dd1-f3c3ee32d9s1",
        parentId: 1
    },
    {
        id: 3,
        title: "task3",
        startDate: 1693947600000,
        endDate: 1694293200000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: 1
    },
    {
        id: 4,
        title: "task4",
        startDate: 1694120400000,
        endDate: 1694638800000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: null
    },
    {
        id: 5,
        title: "task5",
        startDate: 1693947600000,
        endDate: 1694638800000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6",
        projectUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        parentId: 3
    },
    {
        id: 6,
        title: "task6",
        startDate: 1694638800000,
        endDate: 1695157200000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: 4
    },
    {
        id: 7,
        title: "task7",
        startDate: 1693602000000,
        endDate: 1693861200000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: 6
    },
    {
        id: 8,
        title: "task9",
        startDate: 1695157200000,
        endDate: 1695675600000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: null
    },
    {
        id: 9,
        title: "task10",
        startDate: 1693947600000,
        endDate: 1694293200000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId:8
    },
    {
        id: 10,
        title: "task12",
        startDate: 1693947600000,
        endDate: 1694293200000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId:7
    },
    {
        id: 11,
        title: "task13",
        startDate: 1694293200000,
        endDate: 1695157200000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2v6",
        projectUid: "2bd34e3e-55da-4392-9dd1-f3c3ee32d9s1",
        parentId:null
    },
    {
        id: 12,
        title: "task14",
        startDate: 1695157200000,
        endDate: 1695675600000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2v6",
        projectUid: "2bd34e3e-55da-4392-9dd1-f3c3ee32d9s1",
        parentId:11
    },
    {
        id: 13,
        title: "task15",
        startDate: 1695157200000,
        endDate: 1695675600000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2v6",
        projectUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9s1",
        parentId:11
    },
    {
        id: 14,
        title: "task16",
        startDate: 1695675600000,
        endDate: 1696021200000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d9c6",
        projectUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9s1",
        parentId:11
    },
    {
        id: 16,
        title: "task17",
        startDate: 1695157200000,
        endDate: 1695675600000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2v6",
        projectUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9s1",
        parentId:null
    },
    {
        id: 15,
        title: "task18",
        startDate: 1695675600000,
        endDate: 1696021200000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d9c6",
        projectUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9s1",
        parentId:16
    },
    {
        id: 17,
        title: "task19",
        startDate: 1694638800000,
        endDate: 1695157200000,
        userUid: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: 15
    },
    {
        id: 18,
        title: "task20",
        startDate: 1693602000000,
        endDate: 1693861200000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: 17
    },
    {
        id: 19,
        title: "task21",
        startDate: 1695157200000,
        endDate: 1695675600000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId: 18
    },
    {
        id: 20,
        title: "task22",
        startDate: 1693947600000,
        endDate: 1694293200000,
        userUid: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        projectUid: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        parentId:19
    },
]

export const projects: Project[] = [
    {
        id: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9s1",
        title: "Проект 1",
        users: [],
        isOpen: true,
        tasks: []
    },
    {
        id: "2bd34e3e-55da-4392-9dd1-f3c3ee32d9s1",
        title: "Проект 2",
        users: [],
        isOpen: true,
        tasks: []
    },
    {
        id: "2bd34e3e-66da-4392-9dd1-f3c3ee32d9s1",
        title: "ПРОЕКТ 3",
        users: [],
        isOpen: true,
        tasks: []
    }
]

export const resources: Resource[] = [
    {
        id: "2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6",
        name: "Юзер1",
        tasks: []
    },
    {
        id: "2bd34e3e-23da-4392-9dz2-f3c3ee32d9c6",
        name: "Юзер2",
        tasks: []        
    },
    {
        id: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6",
        name: "Юзер3",
        tasks: []
    },
    {
        id: "2bd34e3e-23da-4392-9dz2-f3c3ee32d2v6",
        name: "Ильдар",
        tasks: []
    }
    
]