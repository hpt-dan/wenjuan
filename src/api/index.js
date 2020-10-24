import Axios from 'axios'

export default {
  /**
   * 验证码
   */
  async img (query) {
    return await Axios.get('/msg/img', query)
  },
  /**
   * 登陆
   */
  async check (query) {
    return await Axios.post(`/msg/check`, query)
  },
  /**
   * 新增部门
   */
  async addDept (query) {
    return await Axios.post(`/deptCategory/insertDeptCategory`, query)
  },
  /**
   * 修改部门
   */
  async updateDeptCategory (query) {
    return await Axios.post(`/deptCategory/updateDeptCategory`, query)
  },
  /**
   * 删除部门
   */
  async deleteDeptCategory (query) {
    return await Axios.post(`/deptCategory/delete`, query)
  }, /**
   * 单位类别列表
   */
  async searchAllDepart (query) {
    return await Axios.post(`/deptCategory/searchAll`, query)
  }, /**
   * 单位信息列表
   */
  async searchAllDept (query) {
    return await Axios.post(`/dept/searchAll`, query)
  }, /**
   * 单位信息新增
   */
  async insertDept (query) {
    return await Axios.post(`/dept/insertDept`, query)
  }, /**
   * 单位信息删除(批量)
   */
  async deleteDept (query) {
    return await Axios.post(`/dept/delete`, query)
  }, /**
   * 单位信息修改
   */
  async updateDeptDept (query) {
    return await Axios.post(`/dept/updateDept`, query)
  }, /**
   * 人员管理列表
   */
  async peopleSearch (query) {
    return await Axios.post(`/system/search`, query)
  }, /**
   * 人员管理新增
   */
  async peopleinsertSystemUser (query) {
    return await Axios.post(`/system/insertSystemUser`, query)
  },/**
   * 人员管理修改
   */
  async peopleupdateSystemUserr (query) {
    return await Axios.post(`/system/updateSystemUser`, query)
  },/**
   * 人员管理删除
   */
  async peopledeleteSystemUser (query) {
    return await Axios.post(`/system/deleteSystemUser`, query)
  },/**
   * 单位答题满分报表
   */
  async fuserullMarks (query) {
    return await Axios.post(`/user/fullMarks`, query)
  },/**
   * 乡镇的答题情况
   */
  async townAnswerSearch (query) {
    return await Axios.post(`/user/townAnswerSearch`, query)
  },/**
   * 单位答题情况
   */
  async deptAnswerSearch (query) {
    return await Axios.post(`/user/deptAnswerSearch`, query)
  },/**
   * 考题列表
   */
  async searchAllSubject (query) {
    return await Axios.post(`/subject/searchPage`, query)
  },/**
   * 考题新增
   */
  async insertSubject (query) {
    return await Axios.post(`/subject/insertSubject`, query)
  },/**
   * 考题修改
   */
  async updateSubject (query) {
    return await Axios.post(`/subject/updateSubject`, query)
  },/**
   * 考题删除
   */
  async deleteSubject (query) {
    return await Axios.post(`/subject/deleteSubject`, query)
  },/**
   * 学校考试分页
   */
  async schoolAnswerSearch (query) {
    return await Axios.post(`/user/schoolAnswerSearch`, query)
  },/**
   * 人员答题情况
   */
  async searchAllUser (query) {
    return await Axios.post(`/user/searchAllUser`, query)
  },/**
   * 人员答题情况删除
   */
  async clearUse (query) {
    return await Axios.post(`/user/clearUser`, query)
  },/**
   * 查询人员信息详情
   */
  async searchUser (query) {
    return await Axios.post(`/user/searchUser`, query)
  },/**
   * 单位分页导出
   */
  async deptexcel (query) {
    return await Axios.get(`/dept/excel?pageSize=10&pageNo=1`, query)
  },/**
   * 全部单位和社区
   */
  async searchClassAndTown (query) {
    return await Axios.post(`/dept/searchClassAndTown`, query)
  },/**
   * 批量清除
   */
  async clearUserBatch (query) {
    return await Axios.post(`/user/clearUserBatch`, query)
  },
}
